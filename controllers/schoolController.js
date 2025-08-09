const pool = require('../db.js');


// this function add school details to the school table in database 
const add_school_details = async (req,res) => {
    const { name, address, latitude, longitude } = req.body;

    // Basic presence checks
    if (name == null || address == null || latitude == null || longitude == null) {
        return res.status(400).json({ error: 'name, address, latitude and longitude are required' });
    }

    // Trim and coerce types
    const nameStr = String(name).trim();
    const addressStr = String(address).trim();
    const latNum = parseFloat(latitude);
    const lonNum = parseFloat(longitude);

    // Validate values and ranges
    if (!nameStr || !addressStr) {
        return res.status(400).json({ error: 'name and address must be non-empty strings' });
    }
    if (!Number.isFinite(latNum) || !Number.isFinite(lonNum)) {
        return res.status(400).json({ error: 'latitude and longitude must be valid numbers' });
    }
    if (latNum < -90 || latNum > 90 || lonNum < -180 || lonNum > 180) {
        return res.status(400).json({ error: 'latitude must be between -90 and 90; longitude between -180 and 180' });
    }

    try {
        await pool.query(
            `INSERT INTO schools (name, address, latitude, longitude) VALUES (?,?,?,?)`,
            [nameStr, addressStr, latNum, lonNum]
        );

        res.status(200).json({ message: 'School Registered Successfully' });
    } catch (error) {
        console.error('Error adding school details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// this is a function for the distance bw two cordinates. used Haversine formula for this.
const calculateDistance = (u_latitude, u_longitude, latitude, longitude) => {
    console.log('calculateDistance called with:', u_latitude, u_longitude, latitude, longitude);
    
    const toRad = (degree) => degree * (Math.PI / 180);

    const lat1 = toRad(u_latitude);
    const lon1 = toRad(u_longitude);
    const lat2 = toRad(latitude);
    const lon2 = toRad(longitude);

    const dlat = lat2 - lat1;
    const dlon = lon2 - lon1;
    
    const a =
    Math.sin(dlat / 2) * Math.sin(dlat / 2) +
    Math.cos(lat1) * Math.cos(lat2) *
    Math.sin(dlon / 2) * Math.sin(dlon /2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const r = 6371;

    const distance = r * c;
    
    console.log('Distance calculated:', distance);
    return distance;
};



// for get details of user cordinates and school coordinates and find distance bw them
const get_school_details = async (req,res) => {
    const { u_latitude, u_longitude } = req.query; // user cordinates from user as parameter 
    console.log(req.query);
    
    // Convert strings to numbers and validate
    const userLat = parseFloat(u_latitude);
    const userLng = parseFloat(u_longitude);
    
    if (!userLat || !userLng || isNaN(userLat) || isNaN(userLng)) {
        return res.status(400).json({ 
            error: 'Valid u_latitude and u_longitude are required as query parameters' 
        });
    }
    
    try {
        const [result] = await pool.query(`SELECT * FROM schools`);
        let schools = result.map((school) =>{
            // Convert database values to numbers too
            const schoolLat = parseFloat(school.latitude);
            const schoolLng = parseFloat(school.longitude);
            
            console.log('User coords:', userLat, userLng);
            console.log('School coords:', schoolLat, schoolLng);
            
            let dist = calculateDistance(userLat, userLng, schoolLat, schoolLng);
            console.log('Calculated distance:', dist);
            
            school.distance = Math.round(dist * 100) / 100; // Round to 2 decimal places
            return school
        })
        schools = schools.sort((a,b) => a.distance - b.distance);
        res.json({
            message : "List of schools",
            schools
        })
        
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

}




module.exports = {add_school_details, get_school_details};

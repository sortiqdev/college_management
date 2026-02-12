const Organization = require ("../../models/Organization");
const bcrypt = require ("bcryptjs");

const registerOrganization = async (req,res, next) =>{
    try{
        const {
            orgname,
            orgcode,
            orgemail,
            orgphone,
            country,
            state,city,
            adminname,adminemail,adminpassword,plan
        } = req.body ;

            // Check duplicate org code

            const  existingOrg = await Organization.findOne({orgcode: orgcode.toUpperCase()});
            if(existingOrg){
                console.log(existingOrg);
                return res.status(400).json({message:"Organization is allredy exists with this code",
                    success:false,
                })
                
            }
            const hashpassword  = await bcrypt.hash(adminpassword,12);

            const newOrganization = new Organization({
                orgname,
                orgcode: orgcode.toUpperCase(),
                orgemail,
                orgphone,
                country,
                state,
                city,
                adminname,
                adminemail,
                adminpassword: hashpassword,
                plan,
            });
             console.log(newOrganization);
            await newOrganization.save();
            res.status(201).json({
                message:"Organization registered successfully",
                success:true,
                organization:newOrganization
            })

}catch(error){
    console.error("Error registering organization:", error);
    res.status(500).json({
        message:"Internal server error",
        success:false,
    })
}

}

module.exports = registerOrganization;
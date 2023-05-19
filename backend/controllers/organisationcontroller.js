const Organisation = require('../models/organisation')
const mongoose = require('mongoose');
const UserSchema = require('../models/user')


const organisationGet=async (req,res)=>{

        const orgs=await Organisation.find();
        res.status(200).json(orgs);

}


const organisationGetId=async (req,res)=>{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(404).json({error : "No such Organisation"})
            }
        
            const org=await Organisation.findOne({_id:id});
        
        if(!org){
          return   res.status(201).json({error:"NO SUCH ORGANISATION"});
        }
        res.json(org)
}

const organisationPut=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such Organisation'})
    }
   
       const org=Organisation.findOneAndUpdate({_id:id},{...req.body});
   
  if(!org){
    res.status(201).json({error:"NO SUCH ORGANISATION"});
  }
}

const organisationPost=async (req,res)=>{
   
    try{
   const org = await Organisation.create(req.body);
   const id = org.createdBy;
   console.log(id);        
   const user = await UserSchema.findById(id);
   user.orgs.push(org._id);
   user.save();
   console.log(user)
   res.status(200).json(org);
    }
    catch(error){
       res.status(201).json({error:error.message});
    }
}

const organisationDelete=async (req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error : 'No such project'})
    }
   
    const org=Organisation.findOneAndDelete({_id:id});
    if(!org){
    return res.status(204).json({error:"NO SUCH ORGANISATION"});
    }
        return res.status(200).json({message:"Deleted successfully"});
}

module.exports={    organisationGet,
    organisationGetId,
    organisationPost,
    organisationDelete,
    organisationPut
}
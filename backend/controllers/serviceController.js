import seviceModel from "../models/servisModel.js";
import serviceRouter from "../routes/serviceRouter.js";


const bookService = async (req,res) =>{
    
     try{
        const { firstName, lastName, email, street,city,state,zipcode,country,phone,ProductName} = req.body;

        const serviceData = {
            firstName, 
            lastName, 
            email, 
            street,
            city,
            state,
            zipcode,
            country,
            phone,
            ProductName,
            date: Date.now()
        }
        console.log(serviceData);
        const newService = new seviceModel(serviceData);
        await newService.save()
        res.json({ success: true, message: "Product Added" })
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}

const allService = async (req,res) =>{
    try{
       
        const serviceData = await seviceModel.find({})
        res.json({success:true,serviceData})
        
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
    
}


export {bookService,allService}

const express=require('express');
const app=express();
const port=4242;
const cors =require('cors')
const morgan=require('morgan');
const{Pool}=require('pg');
const{authschema, authschemas}=require('./validation_schema');
const jwt=require('jsonwebtoken');
require('dotenv').config();

let pool=new Pool();


app.use(morgan('common'));
app.use(express.urlencoded({extended:true}));

//getting list from customers
app.get('/info/get',(req,res)=>{

        try{
    pool.connect(async(error,client,release)=>{
        let resp=await client.query(`SELECT * FROM index`);
        release();
        res.json(resp.rows);
    });
}catch(error){
    console.log(error)

}});





//view register user
app.get('/register/all',(req,res)=>{

    try{
pool.connect(async(error,client,release)=>{
   
   let resp=await client.query(`SELECT * FROM index`);
    release();
    res.json(resp.rows);
});
}catch(error){
console.log(error)

}});













app.post('/register',(req,res)=>{
      try{

    //     const {email,password}=req.body
    //     const result=await authschema.validateAsync(req.body)
    //     console.log(result)

    // const doesexist=await User.findone({email:email})
    // if(doesexist)
    // throw createError.conflict(`${email}is already been registered`)  
    
    // const user=new user({email,password})
    // const savedUser=await user.save()

    //INSERT INTO contacts(contact_name,phone,email) VALUES('hudini','12 ','hudini@gmail.com')
   
pool.connect(async(error,client,release)=>{
    let{name,email,password}=req.body
  //  const data={name:req.body.name,email:req.body.email,password:req.body.password};
   //const values=[data.name,data.email,data.password]
    const result=await authschemas.validateasync(req.body)


   let resp=await client.query(`INSERT INTO index(name,email,password) VALUES($1,$2,$3)`,[name,email,password]);
    release();
    res.json(resp.rows);
});
}catch(error){

console.log(error)

}});

//SELECT * FROM A
//FULL [OUTER] JOIN B on A.id = B.id;


//SELECT list,customer_name FROM customers INNER JOIN contacts ON customer_name=contact_name

//view all registration

// app.get('/register',(req,res)=>{

//     try{
// pool.connect(async(error,client,release)=>{
   
//    let resp=await client.query(`SELECT * FROM CONTACTS FULL  JOIN CUSTOMERS ON customer_name=contact_name`);
//     release();
//     res.json(resp.rows);
// });
// }catch(error){
// console.log(error)

// }});      

app.post('/login',(req,res)=>{
    const user={name:username}

const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)

res.json({accessToken:accessToken})

    let{email,password}=req.body

const result= authschemas.validateasync(req.body)
    try{ 
        //const username=req.body.username

        const user={email:email}
        
        const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
        pool.connect(async(error,client,release)=>{
           
           let resp=await client.query(`SELECT list FROM index WHERE email ='${req.body.email}' AND password='${req.body.password}'`);
            res.json(resp.rows);
        });
        }catch(error){
        console.log(error)
        
        }
});



//sidelogin
// app.get('/login/side',(req,res)=>{
//     try{
//         pool.connect(async(error,client,release)=>{
           
//            let resp=await client.query(`SELECT customer_id,list FROM customers WHERE customer_name='david' `);
//             res.json(resp.rows);
//         });
//         }catch(error){
//         console.log(error)
        
//        }
// });



//adding list in customers table
app.post('/info/add',authenticateToken,(req,res)=>{
    //INSERT INTO customers(customer_name,list) VALUES('hudini','show at 8 pm in jakarta')
    
    
    let{list}=req.body
    try{
pool.connect(async(error,client,release)=>{
    let resp=await client.query(`UPDATE index SET list=${req.body.list}`);
    release();
    res.json(resp.rows);
});
}catch(error){
console.log(error)

}});



//deleting list in customers table
app.post('/info/delete',authenticateToken,(req,res)=>{
    
    
    try{
pool.connect(async(error,client,release)=>{
    let resp=await client.query(`DELETE list FROM index WHERE email =${req.body.email}`);
    release();
    res.json(resp.rows);
});
}catch(error){
console.log(error)

}});


//updating values
app.post('/info/update',authenticateToken,(req,res)=>{
    
    
    try{
pool.connect(async(error,client,release)=>{
    let resp=await client.query(`UPDATE index
    SET list = ${req.body.update} 
    WHERE name =${req.body.name}`);
    release();
    res.json(resp.rows);
});
}catch(error){
console.log(error)

}});




function authenticateToken(req,res,next)
{

    const authHeader=req.headers['authorization']
    const token=authHeader && authHeader.split(' ')[1]
    if(token==null) return res.sendStatus(401)


jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{

    if(err) return res.sendStatus(403)

    req.user=user

     next()
})
}





app.listen(port,()=>{
    console.log(`server started at ${port}`)
});
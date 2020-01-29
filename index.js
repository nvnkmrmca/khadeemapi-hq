!function(e){var r={};function t(d){if(r[d])return r[d].exports;var o=r[d]={i:d,l:!1,exports:{}};return e[d].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,d){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:d})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var d=Object.create(null);if(t.r(d),Object.defineProperty(d,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(d,o,function(r){return e[r]}.bind(null,o));return d},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=6)}([function(e,r){e.exports={secret:"mykhadeemappbynaveenkumard",routePrefix:"/api"}},function(e,r){r.success=(e,r,t="")=>e.send({data:r,message:t}),r.unAuthorized=(e,r)=>error(e,401,r),r.error=(e,r)=>{error(e,500,r)},r.vError=(e,r)=>error(e,400,r),r.cError=(e,r)=>error(e,404,r),r.nError=(e,r)=>error(e,404,r),error=(e,r,t)=>e.status(r).send({message:t})},function(e,r){e.exports=require("mongoose")},function(e,r,t){const d=t(5),o=t(0),s=t(1);r.checkToken=(e,r,t)=>{let i=e.headers["x-access-token"]||e.headers.authorization;i&&i.startsWith("Bearer ")&&(i=i.slice(7,i.length)),i?d.verify(i,o.secret,(d,o)=>{d?s.unAuthorized(r,"Token is not valid."):(e.decoded=o,t())}):s.unAuthorized(r,"Authentication token is not supplied.")}},function(e,r,t){const d=t(2);var o=d.Schema;const s=d.Schema({customerId:{type:o.Types.ObjectId,default:null},teamId:{type:o.Types.ObjectId,default:null},number:String,userName:String,password:String,title:String,firstName:String,lastName:String,dob:String,age:Number,gender:String,mobileNo:String,emailId:String,ssnid:String,type:String,role:String,image:String,addressLine1:String,addressLine2:String,city:String,state:String,country:String,pincode:String,os:String,osVersion:String,isActive:Boolean,createdBy:{type:o.Types.ObjectId,default:null},updatedBy:{type:o.Types.ObjectId,default:null}},{timestamps:!0});e.exports=d.model("User",s)},function(e,r){e.exports=require("jsonwebtoken")},function(e,r,t){const d=t(7),o=t(8);var s=t(9);const i=t(10),a=t(2);var n=d(),c=process.env.PORT||3001;n.use(o.urlencoded({extended:!0})),n.use(o.json()),n.use(s({credentials:!0,origin:!0})),a.Promise=global.Promise,a.connect(i.url,{useNewUrlParser:!0,useUnifiedTopology:!0}).then(()=>{console.log("Successfully connected to the database")}).catch(e=>{console.log("Could not connect to the database. Exiting now...",e),process.exit()}),n.use(d.static("assets")),n.use(d.static("web")),n.get("/",(e,r)=>{r.json({message:"api is alive."})}),t(11)(n),n.listen(c,()=>{console.log("API Server is listening on port "+c)})},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("cors")},function(e,r){e.exports={url:"mongodb+srv://naveen:nvnkmr%40123@cluster0-r86wa.mongodb.net/khadeem-demo?retryWrites=true&w=majority"}},function(e,r,t){"use strict";e.exports=e=>{t(12)(e),t(14)(e),t(16)(e),t(18)(e),t(21)(e),t(24)(e),t(28)(e)}},function(e,r,t){"use strict";const d=t(13),o=t(0).routePrefix+"/heartbeat";e.exports=e=>{e.route(o).get(d.get)}},function(e,r,t){"use strict";const d=t(1);r.get=(e,r)=>d.success(r,null,"API is alive.")},function(e,r,t){"use strict";const d=t(3),o=t(15),s=t(0).routePrefix+"/account";e.exports=e=>{e.post(s+"/login",o.login),e.post(s+"/changepassword/:id",d.checkToken,o.changePassword)}},function(e,r,t){"use strict";const d=t(5),o=t(0),s=t(4),i=t(1);r.login=(e,r)=>{if(!e.body.userName||!e.body.password)return i.vError(r,"Validation failed. Please fill all the required fields.");s.find({userName:e.body.userName,password:e.body.password,isActive:!0}).then(t=>{if(!t||t.length<1)return i.cError(r,"User not found.");(e.body.os||e.body.osVersion)&&s.findByIdAndUpdate(t[0]._id,{os:e.body.os||"",osVersion:e.body.osVersion||""},{new:!0}).then(e=>{}).catch(e=>{});let a=d.sign({username:e.body.userName},o.secret,{expiresIn:"24h"});return i.success(r,{token:a,user:t[0]})}).catch(e=>"ObjectId"===e.kind?i.nError(r,"User not found."):i.error(r,"Internal Server Error."))},r.changePassword=(e,r)=>{if(!e.params.id||!e.body.password||!e.body.newPassword)return i.vError(r,"Validation failed. Please fill all the required fields.");let t=e.headers["user-id"]||"";s.findOneAndUpdate({_id:e.params.id,password:e.body.password},{password:e.body.newPassword||"",updatedBy:t},{new:!0}).then(e=>e&&e._id?i.success(r,!0):i.success(r,!1,"Please enter the valid password.")).catch(t=>"ObjectId"===t.kind?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Error updating record with id "+e.params.id))}},function(e,r,t){"use strict";const d=t(3),o=t(17),s=t(0).routePrefix+"/user";e.exports=e=>{e.post(s,d.checkToken,o.create),e.get(s+"s",d.checkToken,o.findAll),e.get(s+"s/bycustomer/:id",d.checkToken,o.findAllByCustomer),e.get(s+"s/byteam/:id",d.checkToken,o.findAllByTeam),e.get(s+"/:id",d.checkToken,o.findOne),e.put(s+"/:id",d.checkToken,o.update),e.delete(s+"/:id",d.checkToken,o.delete)}},function(e,r,t){"use strict";const d=t(4),o=t(1);r.create=(e,r)=>{let t=e.headers["user-id"]||"";if(!(t&&e.body.userName&&e.body.password&&e.body.firstName))return o.vError(r,"Validation failed. Please fill all the required fields.");d.findOne({$and:[{$or:[{userName:e.body.userName}],isActive:!0}]},{_id:1}).then(s=>{if(s&&s._id)return o.cError(r,"User with same mobile number already exists. So please try with different mobile number.");new d({customerId:e.body.customerId||null,teamId:e.body.teamId||null,number:e.body.number||"",userName:e.body.userName||"",password:e.body.password||"",title:e.body.title||"",firstName:e.body.firstName||"",lastName:e.body.lastName||"",dob:e.body.dob||"",age:e.body.age||0,gender:e.body.gender||"",mobileNo:e.body.mobileNo||"",emailId:e.body.emailId||"",ssnid:e.body.ssnid||"",type:e.body.type||"",role:e.body.role||"",image:e.body.image||"",addressLine1:e.body.addressLine1||"",addressLine2:e.body.addressLine2||"",city:e.body.city||"",state:e.body.state||"",country:e.body.country||"",pincode:e.body.pincode||"",os:"",osVersion:"",isActive:!0,createdBy:t}).save().then(e=>e&&e._id?o.success(r,e._id):o.cError(r,"Some error occurred while creating a record.")).catch(e=>o.error(r,e.message||"Some error occurred while creating a record."))}).catch(e=>o.error(r,e.message||"Some error occurred while creating a record."))},r.findAll=(e,r)=>{d.find({isActive:!0}).then(e=>o.success(r,e)).catch(e=>o.error(r,e.message||"Some error occurred while retrieving data."))},r.findAllByCustomer=(e,r)=>{d.find({customerId:e.params.id,isActive:!0}).then(e=>o.success(r,e)).catch(e=>o.error(r,e.message||"Some error occurred while retrieving data."))},r.findAllByTeam=(e,r)=>{d.find({teamId:e.params.id,isActive:!0}).then(e=>o.success(r,e)).catch(e=>o.error(r,e.message||"Some error occurred while retrieving data."))},r.findOne=(e,r)=>{d.findById(e.params.id).then(t=>t&&t._id?o.success(r,t):o.cError(r,"Record not found with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Error retrieving record with id "+e.params.id))},r.update=(e,r)=>{let t=e.headers["user-id"]||"";if(!(t&&e.body.userName&&e.body.password&&e.body.firstName))return o.vError(r,"Validation failed. Please fill all the required fields.");let s={customerId:e.body.customerId||null,teamId:e.body.teamId||null,number:e.body.number||"",userName:e.body.userName||"",password:e.body.password||"",title:e.body.title||"",firstName:e.body.firstName||"",lastName:e.body.lastName||"",dob:e.body.dob||"",age:e.body.age||0,gender:e.body.gender||"",mobileNo:e.body.mobileNo||"",emailId:e.body.emailId||"",ssnid:e.body.ssnid||"",type:e.body.type||"",role:e.body.role||"",image:e.body.image||"",addressLine1:e.body.addressLine1||"",addressLine2:e.body.addressLine2||"",city:e.body.city||"",state:e.body.state||"",country:e.body.country||"",pincode:e.body.pincode||"",updatedBy:t};d.findOne({userName:e.body.userName,isActive:!0},{_id:1}).then(t=>{if(t&&t._id&&t._id!=e.params.id)return o.cError(r,"User with same user name already exists. So please try with different user name.");d.findByIdAndUpdate(e.params.id,s,{new:!0}).then(t=>t&&t._id?o.success(r,t._id):o.cError(r,"Error updating record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Internal server error. Error updating record with id "+e.params.id))}).catch(t=>o.error(r,"Internal server error. Error updating record with id "+e.params.id))},r.delete=(e,r)=>{let t=e.headers["user-id"]||"";if(!t)return o.vError(r,"Validation failed. Please fill all the required fields.");d.findByIdAndUpdate(e.params.id,{isActive:!1,updatedBy:t||null}).then(t=>t&&t._id?o.success(r,!0,"Record deleted successfully."):o.cError(r,"Could not delete record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Internal server error. Could not delete record with id "+e.params.id))}},function(e,r,t){"use strict";const d=t(3),o=t(19),s=t(0).routePrefix+"/customer";e.exports=e=>{e.post(s,d.checkToken,o.create),e.get(s+"s",d.checkToken,o.findAll),e.get(s+"/:id",d.checkToken,o.findOne),e.put(s+"/:id",d.checkToken,o.update),e.delete(s+"/:id",d.checkToken,o.delete)}},function(e,r,t){"use strict";const d=t(20),o=t(1);r.create=(e,r)=>{let t=e.headers["user-id"]||"";if(!t||!e.body.name)return o.vError(r,"Validation failed. Please fill all the required fields.");new d({name:e.body.name,logo:e.body.logo||"",isActive:!0,createdBy:t}).save().then(e=>e&&e._id?o.success(r,e._id):o.cError(r,"Some error occurred while creating a record.")).catch(e=>o.error(r,e.message||"Some error occurred while creating a record."))},r.findAll=(e,r)=>{d.find({isActive:!0}).then(e=>o.success(r,e)).catch(e=>o.error(r,e.message||"Some error occurred while retrieving data."))},r.findOne=(e,r)=>{d.findById(e.params.id).then(t=>t&&t._id?o.success(r,t):o.cError(r,"Record not found with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Error retrieving record with id "+e.params.id))},r.update=(e,r)=>{let t=e.headers["user-id"]||"";if(!t||!e.body.name)return o.vError(r,"Validation failed. Please fill all the required fields.");d.findByIdAndUpdate(e.params.id,{name:e.body.name,logo:e.body.logo||"",updatedBy:t},{new:!0}).then(t=>t&&t._id?o.success(r,t._id):o.cError(r,"Error updating record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Internal server error. Error updating record with id "+e.params.id))},r.delete=(e,r)=>{let t=e.headers["user-id"]||"";if(!t)return o.vError(r,"Validation failed. Please fill all the required fields.");d.findByIdAndUpdate(e.params.id,{isActive:!1,updatedBy:t||null}).then(t=>t&&t._id?o.success(r,!0,"Record deleted successfully."):o.cError(r,"Could not delete record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Internal server error. Could not delete record with id "+e.params.id))}},function(e,r,t){const d=t(2);var o=d.Schema;const s=d.Schema({name:String,logo:String,isActive:Boolean,createdBy:{type:o.Types.ObjectId,default:null},updatedBy:{type:o.Types.ObjectId,default:null}},{timestamps:!0});e.exports=d.model("Customer",s)},function(e,r,t){"use strict";const d=t(3),o=t(22),s=t(0).routePrefix+"/team";e.exports=e=>{e.post(s,d.checkToken,o.create),e.get(s+"s",d.checkToken,o.findAll),e.get(s+"s/:customerId",d.checkToken,o.findAllByCustomer),e.get(s+"/:id",d.checkToken,o.findOne),e.put(s+"/:id",d.checkToken,o.update),e.delete(s+"/:id",d.checkToken,o.delete)}},function(e,r,t){"use strict";const d=t(23),o=t(1);r.create=(e,r)=>{let t=e.headers["user-id"]||"";if(!t||!e.body.customerId||!e.body.name)return o.vError(r,"Validation failed. Please fill all the required fields.");new d({customerId:e.body.customerId,name:e.body.name,isActive:!0,createdBy:t}).save().then(e=>e&&e._id?o.success(r,e._id):o.cError(r,"Some error occurred while creating a record.")).catch(e=>o.error(r,e.message||"Some error occurred while creating a record."))},r.findAll=(e,r)=>{d.find({isActive:!0}).then(e=>o.success(r,e)).catch(e=>o.error(r,e.message||"Some error occurred while retrieving data."))},r.findAllByCustomer=(e,r)=>{d.find({customerId:e.params.customerId,isActive:!0}).then(e=>o.success(r,e)).catch(e=>o.error(r,e.message||"Some error occurred while retrieving data."))},r.findOne=(e,r)=>{d.findById(e.params.id).then(t=>t&&t._id?o.success(r,t):o.cError(r,"Record not found with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Error retrieving record with id "+e.params.id))},r.update=(e,r)=>{let t=e.headers["user-id"]||"";if(!t||!e.body.customerId||!e.body.name)return o.vError(r,"Validation failed. Please fill all the required fields.");d.findByIdAndUpdate(e.params.id,{customerId:e.body.customerId,name:e.body.name,updatedBy:t},{new:!0}).then(t=>t&&t._id?o.success(r,t._id):o.cError(r,"Error updating record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Internal server error. Error updating record with id "+e.params.id))},r.delete=(e,r)=>{let t=e.headers["user-id"]||"";if(!t)return o.vError(r,"Validation failed. Please fill all the required fields.");d.findByIdAndUpdate(e.params.id,{isActive:!1,updatedBy:t||null}).then(t=>t&&t._id?o.success(r,!0,"Record deleted successfully."):o.cError(r,"Could not delete record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?o.nError(r,"Record not found with id "+e.params.id):o.error(r,"Internal server error. Could not delete record with id "+e.params.id))}},function(e,r,t){const d=t(2);var o=d.Schema;const s=d.Schema({customerId:{type:o.Types.ObjectId,default:null},name:String,isActive:Boolean,createdBy:{type:o.Types.ObjectId,default:null},updatedBy:{type:o.Types.ObjectId,default:null}},{timestamps:!0});e.exports=d.model("Team",s)},function(e,r,t){"use strict";const d=t(3),o=t(25),s=t(0).routePrefix+"/ticket";e.exports=e=>{e.post(s,d.checkToken,o.create),e.get(s+"s",d.checkToken,o.findAll),e.get(s+"s/bycustomer/:id",d.checkToken,o.findAllByCustomer),e.get(s+"s/byteam/:id",d.checkToken,o.findAllByTeam),e.get(s+"s/my",d.checkToken,o.findMy),e.get(s+"/:id",d.checkToken,o.findOne),e.put(s+"/update/:id",d.checkToken,o.update),e.delete(s+"/:id",d.checkToken,o.delete),e.put(s+"/status/:id",d.checkToken,o.statusUpdate),e.put(s+"/assign/:id",d.checkToken,o.assignUser),e.put(s+"/duedate/:id",d.checkToken,o.updateDueDate),e.post(s+"/response/:id",d.checkToken,o.addResponse),e.put(s+"/response/:id",d.checkToken,o.updateResponse),e.delete(s+"/response/:id",d.checkToken,o.deleteResponse),e.get(s+"s/tags",d.checkToken,o.findAllTags),e.get(s+"s/tagsbycustomer/:id",d.checkToken,o.findAllByTagsCustomer),e.post(s+"/search",d.checkToken,o.search),e.post(s+"/searchmy",d.checkToken,o.searchMy)}},function(e,r,t){"use strict";const d=t(2),o=t(26),s=t(4),i=t(1),a=t(27);r.create=(e,r)=>{let t=e.headers["user-id"]||"";if(!(t&&e.body.type&&e.body.subject&&e.body.priority&&e.body.status))return i.vError(r,"Validation failed. Please fill all the required fields.");new o({type:e.body.type||"",subject:e.body.subject||"",description:e.body.description||"",attachment:e.body.attachment&&e.body.attachment.lenght>0?e.body.attachment:[],priority:e.body.priority||"",customer:e.body.customer||null,team:e.body.team||null,status:e.body.status||"",latitude:e.body.latitude||0,longitude:e.body.longitude||"",location:e.body.location||"",tags:e.body.tags&&e.body.tags.length>0?e.body.tags:[],responses:e.body.responses&&e.body.responses.length>0?e.body.responses:[],isActive:!0,createdBy:t}).save().then(e=>e&&e._id?i.success(r,e._id):i.cError(r,"Some error occurred while creating a record.")).catch(e=>i.error(r,e.message||"Some error occurred while creating a record."))},r.findAll=(e,r)=>{o.find({isActive:!0}).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))},r.findAllByCustomer=(e,r)=>{o.find({customer:e.params.id,isActive:!0}).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))},r.findMy=(e,r)=>{let t=e.headers["user-id"]||"";if(!t)return i.vError(r,"Validation failed. Please fill all the required fields.");o.find({$and:[{$or:[{createdBy:t},{assignedTo:t}]},{isActive:!0}]}).then(e=>{n(e,r)}).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))},r.findAllByTeam=(e,r)=>{o.find({team:e.params.id,isActive:!0}).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))},r.findOne=(e,r)=>{o.findById(e.params.id).then(t=>t&&t._id?i.success(r,t):i.cError(r,"Record not found with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Error retrieving record with id "+e.params.id))},r.update=(e,r)=>{let t=e.headers["user-id"]||"";if(!(t&&e.body.type&&e.body.subject&&e.body.priority&&e.body.status))return i.vError(r,"Validation failed. Please fill all the required fields.");o.findByIdAndUpdate(e.params.id,{type:e.body.type||"",subject:e.body.subject||"",description:e.body.description||"",attachment:e.body.attachment&&e.body.attachment.lenght>0?e.body.attachment:[],priority:e.body.priority||"",customer:e.body.customer||null,team:e.body.team||null,status:e.body.status||"",latitude:e.body.latitude||0,longitude:e.body.longitude||"",location:e.body.location||"",tags:e.body.tags&&e.body.tags.length>0?e.body.tags:[],updatedBy:t},{new:!0}).then(t=>t&&t._id?i.success(r,t._id):i.cError(r,"Error updating record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Error updating record with id "+e.params.id))},r.delete=(e,r)=>{let t=e.headers["user-id"]||"";if(!t)return i.vError(r,"Validation failed. Please fill all the required fields.");o.findByIdAndUpdate(e.params.id,{isActive:!1,updatedBy:t||null}).then(t=>t&&t._id?i.success(r,!0,"Record deleted successfully."):i.cError(r,"Could not delete record with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Could not delete record with id "+e.params.id))},r.statusUpdate=(e,r)=>{let t=e.headers["user-id"]||"";if(!t||!e.body.status)return i.vError(r,"Validation failed. Please fill all the required fields.");o.findByIdAndUpdate(e.params.id,{status:e.body.status,updatedBy:t||null},{new:!0}).then(t=>t&&t._id?i.success(r,!0,"Ticket status updated successfully."):i.cError(r,"Could not update status of ticket with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Could not delete record with id "+e.params.id))},r.assignUser=(e,r)=>{let t=e.headers["user-id"]||"";if(!t||!e.body.assignedTo)return i.vError(r,"Validation failed. Please fill all the required fields.");o.findByIdAndUpdate(e.params.id,{assignedTo:e.body.assignedTo,updatedBy:t||null},{new:!0}).then(d=>d&&d._id?(e.body.comments&&e.body.comments.length>1&&(o.updateOne({_id:e.params.id},{$push:{responses:{type:e.body.comments[0].type||"",comment:e.body.comments[0].comment||"",attachment:e.body.comments[0].attachment||"",isActive:!0,createdBy:t||null}}},{new:!0}).then().catch(),o.updateOne({_id:e.params.id},{$push:{responses:{type:e.body.comments[1].type||"",comment:e.body.comments[1].comment||"",attachment:e.body.comments[1].attachment||"",isActive:!0,createdBy:t||null}}},{new:!0}).then().catch()),i.success(r,!0,"User assigned to ticket successfully.")):i.cError(r,"Could not assing user to ticket with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Could not delete record with id "+e.params.id))},r.updateDueDate=(e,r)=>{let t=e.headers["user-id"]||"";if(!t||!e.body.dueDate)return i.vError(r,"Validation failed. Please fill all the required fields.");o.findByIdAndUpdate(e.params.id,{dueDate:e.body.dueDate,updatedBy:t||null},{new:!0}).then(t=>t&&t._id?i.success(r,!0,"Due date updated successfully."):i.cError(r,"Could not update due date to ticket with id "+e.params.id)).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Could not delete record with id "+e.params.id))},r.addResponse=(e,r)=>{if(!e.body.type||!e.body.comment||!e.params.id)return i.vError(r,"Validation failed. Please fill all the required fields.");let t=e.headers["user-id"]||"";o.updateOne({_id:e.params.id},{$push:{responses:{type:e.body.type||"",comment:e.body.comment||"",attachment:e.body.attachment||"",isActive:!0,createdBy:t||null}}},{new:!0}).then(t=>{if(!t||!t.ok||t.ok<1)return i.cError(r,"Failed to add response.");o.findById(e.params.id,{responses:[{$elemMatch:{isActive:!0}}]}).then(e=>!e||!e.responses||e.responses.length<1?i.cError(r,"Failed to add response."):i.success(r,e.responses[e.responses.length-1]._id)).catch(e=>i.error(r,e.message||"Some error occurred while creating a record."))}).catch(e=>i.error(r,e.message||"Some error occurred while creating a record."))},r.updateResponse=(e,r)=>{if(!e.body.type||!e.body.comment||!e.params.id)return i.vError(r,"Validation failed. Please fill all the required fields.");let t=e.headers["user-id"]||"";o.findOneAndUpdate({"responses._id":e.params.id},{$set:{"responses.$.type":e.body.type||"","responses.$.comment":e.body.comment||"","responses.$.attachment":e.body.attachment||"","responses.$.updatedBy":t||null}},{projection:{}}).then(t=>t&&t._id?i.success(r,e.params.id):i.cError(r,"Failed to update response.")).catch(e=>i.error(r,e.message||"Some error occurred while creating a record."))},r.deleteResponse=(e,r)=>{o.update({"responses._id":e.params.id},{$pull:{responses:{_id:e.params.id}}},{safe:!0,multi:!0,new:!0}).then(t=>!t||!t.ok||t.ok<1?i.cError(r,"Could not delete record with id "+e.params.id):i.success(r,!0,"Record deleted successfully.")).catch(t=>"ObjectId"===t.kind||"NotFound"===t.name?i.nError(r,"Record not found with id "+e.params.id):i.error(r,"Internal server error. Could not delete record with id "+e.params.id))},r.findAllTags=(e,r)=>{o.aggregate([{$match:{$and:[{isActive:!0}]}},{$project:{_id:0,tags:1}},{$unwind:"$tags"},{$group:{_id:"$tags.name",count:{$sum:1}}}]).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))},r.findAllByTagsCustomer=(e,r)=>{o.aggregate([{$match:{$and:[{customer:d.Types.ObjectId(e.params.id),isActive:!0}]}},{$project:{_id:0,tags:1}},{$unwind:"$tags"},{$group:{_id:"$tags.name",count:{$sum:1}}}]).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))},r.search=(e,r)=>{if(!(e.headers["user-id"]||""))return i.vError(r,"Validation failed. Please fill all the required fields.");let t={isActive:!0};e.body.status&&(t.status=e.body.status),e.body.priority&&(t.priority=e.body.priority),e.body.assignedTo&&(t.assignedTo=e.body.assignedTo),e.body.type&&(t.type=e.body.type),e.body.subject&&(t.subject=e.body.subject),e.body.tag&&(t.tag.name=e.body.tag),e.body.location&&(t.location=e.body.location),e.body.customer&&(t.customer=e.body.customer),e.body.team&&(t.team=e.body.team),o.find(t).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))},r.searchMy=(e,r)=>{let t=e.headers["user-id"]||"";if(!t)return i.vError(r,"Validation failed. Please fill all the required fields.");let d={isActive:!0};e.body.status&&(d.status=e.body.status),e.body.priority&&(d.priority=e.body.priority),e.body.assignedTo&&(d.assignedTo=e.body.assignedTo),e.body.type&&(d.type=e.body.type),e.body.subject&&(d.subject=e.body.subject),e.body.tag&&(d.tag.name=e.body.tag),e.body.location&&(d.location=e.body.location),e.body.customer&&(d.customer=e.body.customer),e.body.team&&(d.team=e.body.team),o.find({$and:[{$or:[{createdBy:t},{assignedTo:t}]},d]}).then(e=>i.success(r,e)).catch(e=>i.error(r,e.message||"Some error occurred while retrieving data."))};let n=(e,r,t=!1)=>{e=a.clone(e);let d=[];if(!(e&&e.length>0))return i.success(r,t&&e&&e.length>0?e[0]:e);e.map((e,r)=>{e.assignedTo&&d.indexOf(e.assignedTo)<0&&d.push(e.assignedTo)}),console.log(d),s.find({_id:{$in:d}},{_id:1}).then(d=>(console.log(d),e.forEach((e,r)=>{let t=d.find(r=>r._id===e.assignedTo);return t&&t._id&&(e.assignedTo=t),e}),i.success(r,t&&e&&e.length>0?e[0]:e))).catch(d=>i.success(r,t&&e&&e.length>0?e[0]:e))}},function(e,r,t){const d=t(2);var o=d.Schema;const s=d.Schema({name:String,description:String,customer:String,isActive:Boolean,createdBy:{type:o.Types.ObjectId,default:null},updatedBy:{type:o.Types.ObjectId,default:null}},{timestamps:!0}),i=d.Schema({type:String,comment:String,attachment:String,isActive:Boolean,createdBy:{type:o.Types.ObjectId,default:null},updatedBy:{type:o.Types.ObjectId,default:null}},{timestamps:!0}),a=d.Schema({type:String,subject:String,description:String,attachment:[String],priority:String,customer:{type:o.Types.ObjectId,default:null},team:{type:o.Types.ObjectId,default:null},assignedTo:{type:o.Types.ObjectId,default:null},dueDate:{type:o.Types.Date,default:null},status:String,latitude:String,longitude:String,location:String,tags:[s],responses:[i],isActive:Boolean,createdBy:{type:o.Types.ObjectId,default:null},updatedBy:{type:o.Types.ObjectId,default:null}},{timestamps:!0});e.exports=d.model("Ticket",a)},function(e,r){r.clone=e=>JSON.parse(JSON.stringify(e))},function(e,r,t){"use strict";const d=t(3);var o=t(29);const s=t(0).routePrefix+"/upload",i=o.diskStorage({destination(e,r,t){t(null,"./assets/file")},filename(e,r,t){t(null,`${r.originalname}`)}}),a=o({storage:i});e.exports=e=>{e.post(s,d.checkToken,(e,r,t)=>{a.single("file")(e,r,(function(e){return e instanceof o.MulterError?r.send(e):e?r.send(e):r.send({data:!0,message:""})}))})}},function(e,r){e.exports=require("multer")}]);
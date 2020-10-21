var mongoose = require("mongoose");
var Service = require("./models/services.js");

var data= [
	{
		name: "Mechanic service",
		sId:"mech",
		icon:"mechIcon.png",
		image:"Mech.jpg",
		subServices:[
			{  name:"Bike-Puncher",
			   image:"mech1.jpg",
			   price:100},
			{  name:"Car-Puncher",
			   image:"mech2.jpg",
			   price:500},
			{  name:"Bike-service",
			   image:"mech3.jpg",
			   price:1000},
			{  name:"Car-service",
			   image:"mech4.jpg",
			   price:1000},
			{  name:"others",
			   image:"mech5.jpg",
			   price:2000}
			],
		options:["Bike-puncher","car-puncher","bike-service","car-service","others"],
		shortDescription:"Get the awesome mechanic services on your doorsteps,just by one click!!!",
		description:"You will have a really good first experience at OHMs. The technicians will be polite and explain everything in detail. They will do a thorough check and provide a   feasible solution. You will feel like you  got a little more for the price you paid. You Will surely visit again for further maintenance. we specialize in preventive maintenance and auto repair to maximize the life of your vehicle. Our technicians implement best practices for automotive maintenance and auto repair."
	},
	{
		name: "Plumber service",
		sId:"plum",
		icon:"plumIcon.png",
		image:"Plum.jpg",
		subServices:[
			{  name:"Basin&Sink",
			   image:"plum1.jpg",
			   price:100},
			{  name:"Bathroom",
			   image:"plum2.jpg",
			   price:500},
			{  name:"Toilet",
			   image:"plum3.jpg",
			   price:1000},
			{  name:"Tap",
			   image:"plum4.png",
			   price:1000},
			{  name:"Water-Tank",
			   image:"plum5.jpg",
			   price:1000},
			{  name:"Pipes",
			   image:"plum6.jpg",
			   price:1000},
			{  name:"Blockage",
			   image:"plum7.jpg",
			   price:1000},
			{  name:"others",
			   image:"plum8.png",
			   price:2000}
			],
		options:["basin&Sink","bathroom","toilet","tap","water-tank","Pipes","Blockage","others"],
		shortDescription:"Get the awesome plumber services on your doorsteps,just by one click!!!",
		description:"All our Service Providers are among the best in market, each having an experience of around 5 - 15 years in the domain and hence their quality is miles ahead of the local technicians. We don't  send random unverified service providers; all of them are background checked and police verified. Hence they are trusted and reliable. We ensure a guaranteed satisfaction on your job. We also offer 7 days warranty on the work done in case you are not satisfied. We would do the rework free of cost should a problem arise within 7 days of the work done by us."
	},
	{
		name: "Electrician-ing",
		sId:"elec",
		icon:"elecIcon.png",
		image:"Elec.jpg",
		subServices:[
			{  name:"Fan",
			   image:"elec1.jpg",
			   price:100},
			{  name:"AC",
			   image:"elec2.png",
			   price:500},
			{  name:"Washing Machine",
			   image:"elec3.jpg",
			   price:1000},
			{  name:"Microwave",
			   image:"elec4.jpg",
			   price:1000},
			{  name:"Inverter",
			   image:"elec5.png",
			   price:1000},
			{  name:"Refrigerator",
			   image:"elec6.png",
			   price:1000},
			{  name:"Cooler",
			   image:"elec7.jpg",
			   price:1000},
			{  name:"TV",
			   image:"elec8.jpg",
			   price:1000},
			{  name:"Heater",
			   image:"elec9.jpg",
			   price:1000},
			{  name:"Gyser",
			   image:"elec10.jpg",
			   price:1000},
			{  name:"Swith&Socket",
			   image:"elec11.png",
			   price:1000},
			{  name:"Wiring",
			   image:"elec12.jpg",
			   price:1000},
			{  name:"MCB/Fuse",
			   image:"elec13.jpg",
			   price:1000},
			{  name:"others",
			   image:"elec14.jpg",
			   price:2000}
			],
		options:["fan","AC","washing machine","Microwave","Inverter","refrizerator","cooler","tv","Heater","gyser","switch&socket","wiring","MCB/fuse","others"],
		shortDescription:"Get the awesome electrician services on your doorsteps,just by one click!!!",
		description:"OHMS has in a short period of time earned an excellent reputation for its quality, efficiency and timely completion of both small and large electrical projects across the city his highly equipped office with the latest technological support is ready to meet all electrical contracting business in Software Facilities, Commercial Complex, Group Housing and Apartments, Factories and Industries, Biotechnology facilities, Hotels and Resorts, Educational Institutions as well as Sub Stations.Contact us fo ..."
	},
	{
		name: "WiFi Services",
		sId:"wifi",
		icon:"wifiIcon.png",
		image:"WiFi.png",
		subServices:[
			{  name:"Installation",
			   image:"wifi1.jpg",
			   price:100},
			{  name:"Maintenance",
			   image:"wifi2.jpg",
			   price:500},
			{  name:"others",
			   image:"wifi3.jpg",
			   price:2000}
			],
		options:["installation","maintainance","others"],
		shortDescription:"Get the awesome WiFi services on your doorsteps,just by one click!!!",
		description:"OHMS are known to offer excellent wireless internet connections for any and every purpose. Their services are in demand from those who are looking to have it installed in their homes as well as by those who own business and office spaces. Over the years each of these set ups have made a name for themselves and because of this have been approached by numerous lifestyle centers as well for their services"
	},
	{
		name: "Mobile-Repair",
		sId:"mob",
		icon:"mobIcon.png",
		image:"Mob.jpg",
		options:[],
		shortDescription:"Get the awesome mobile-repair services on your doorsteps,just by one click!!!",
		description:"OHMS is the best place to get your phone repaired right at your doorstep! To get all details of your phone repair online, all you have to do is download the OHMS app and search for the model of your phone. With the help of our expertly trained technicians, you won’t have to worry about getting your phone repaired at all. "
	},
	{
		name: "Cable Services",
		sId:"cab",
		icon:"cabIcon.png",
		image:"Cab.jpg",
		subServices:[
			{  name:"Installation",
			   image:"cab1.jpg",
			   price:100},
			{  name:"Maintenance",
			   image:"cab2.jpg",
			   price:500},
			{  name:"others",
			   image:"cab3.png",
			   price:2000}
			],
		options:["installation","others"],
		shortDescription:"Get the awesome cable services on your doorsteps,just by one click!!!",
		description:"Whether you’re moving and want to set up new service before you settle in or you're looking for alternatives to your current cable provider, OHMS can help. With just one call, you can set up cable TV service, high-speed internet service, phone service, and even home security services. Enter your zip code, choose the company you want in your area, and call to speak to one of our experts."
	},
	{
		name: "Carpenter-ing",
		sId:"car",
		icon:"carIcon.png",
		image:"Car.jpg",
		subServices:[
			{  name:"Bed",
			   image:"car1.jpeg",
			   price:100},
			{  name:"Furniture",
			   image:"car2.jpg",
			   price:500},
			{  name:"Table/diningTable",
			   image:"car3.jpg",
			   price:1000},
			{  name:"Cupboard/Drawer",
			   image:"car4.jpg",
			   price:1000},
			{  name:"Window/Door",
			   image:"car5.jpeg",
			   price:1000},
			{  name:"Chairs",
			   image:"car6.jpg",
			   price:1000},
			{  name:"Polishing",
			   image:"car7.jpg",
			   price:1000},
			{  name:"Repair",
			   image:"car8.png",
			   price:1000},
			{  name:"others",
			   image:"car9.jpg",
			   price:2000}
			],
		options:["bed","furniture","table/diningTable","cupboard/drawer","window/door","chairs","polishing","repair","others"],
		shortDescription:"Get the awesome carpainter services on your doorsteps,just by one click!!!",
		description:"Why go looking for help when help can come to you? When it comes to carpentry work – be it furniture repairs or even making custom pieces, getting the right carpenter ensures that the work will be done in a timely manner and the finished product will look good.This can include repair work for cabinets and cardboards, creating shelves, replacing door hinges or making alterations. Looking for carpentry services online is easier than asking around for a local technician."
	},
	{
		name: "PEST-CONTROL",
		sId:"pest",
		icon:"pestIcon.png",
		image:"Pest.jpg",
		subServices:[
			{  name:"Cockroach-control",
			   image:"pest1.jpg",
			   price:100},
			{  name:"BedBugs Control",
			   image:"pest2.jpg",
			   price:500},
			{  name:"Ant Control",
			   image:"pest3.jpg",
			   price:1000},
			{  name:"Mosquito Control",
			   image:"pest4.jpg",
			   price:1000},
			{  name:"HouseFlies Control",
			   image:"pest5.jpg",
			   price:1000},
			{  name:"Rat Control",
			   image:"pest6.jpg",
			   price:1000},
			{  name:"others",
			   image:"pest7.jpg",
			   price:2000}
			],
		options:["cockroach-control","bedbugs-control","ant-control","mosquito-control","houseflies-control","rat-control","others"],
		shortDescription:"Get the awesome pest-control services on your doorsteps,just by one click!!!",
		description:"We render Pest Control and Management Measures using only Safe environment-friendly and non-polluting odor-free insecticides recommended by WHO or approved by CIB and organic repellants based on Bio- remedial measures. Highly customized treatment measures, that ensure total safety to human lives and the property, will be the basis of our pest management program since two properties are never alike. "
	},
	{
		name: "Laundry Services",
		sId:"laun",
		icon:"launIcon.png",
		image:"Laun.jpg",
		subServices:[
			{  name:"Washing",
			   image:"laun1.jpg",
			   price:100},
			{  name:"Iron",
			   image:"laun2.jpg",
			   price:500},
			{  name:"Both",
			   image:"laun3.jpg",
			   price:1000},
			{  name:"Dry Cleaning",
			   image:"laun4.jpg",
			   price:1000},
			{  name:"others",
			   image:"laun5.png",
			   price:2000}
			],
		options:["washing","iron","both","dry-cleaning","others"],
		shortDescription:"Get the awesome laundry services on your doorsteps,just by one click!!!",
		description:"The amount we charge is equivalent to the cost you bear to get the laundry done at your home.Our front loading machines consume 3 times less water than the conventional washing machinesYour clothes are delivered at your doorstep with the perfect crease.We schedule pickup and drop as per your convenience."
	},
	{
		name: "SANITISATION",
		sId:"san",
		icon:"sanIcon.png",
		image:"San.jpg",
		subServices:[
			{  name:"Home",
			   image:"san1.jpg",
			   price:100},
			{  name:"Office",
			   image:"san2.jpg",
			   price:500},
			{  name:"others",
			   image:"san3.jpg",
			   price:2000}
			],
		options:["home","office","others"],
		shortDescription:"Get the awesome sanitisation services on your doorsteps,just by one click!!!",
		description:"A quick-spreading and infectious virus is a serious situation. On top of spreading through human contact, often the bacteria and germs found in these viruses can live on surfaces and objects for up to two weeks. Along with refraining from close personal contact with infected people, it’s important to keep our daily environments safe and sanitized too."
	},
	{
		name: "Cleaning service",
		sId:"cle",
		icon:"cleIcon.png",
		image:"Cle.jpg",
		subServices:[
			{  name:"Home",
			   image:"cle1.jpg",
			   price:100},
			{  name:"Room",
			   image:"cle2.png",
			   price:500},
			{  name:"Kitchen",
			   image:"cle3.jpg",
			   price:1000},
			{  name:"Bathroom",
			   image:"cle4.jpg",
			   price:1000},
			{  name:"Toilet",
			   image:"cle5.jpg",
			   price:1000},
			{  name:"Office",
			   image:"cle6.jpg",
			   price:1000},
			{  name:"others",
			   image:"cle7.jpg",
			   price:2000}
			],
		options:["home","rooms","kitchen","Bathroom","toilet","office","others"],
		shortDescription:"Get the awesome cleaning services on your doorsteps,just by one click!!!",
		description:"Being an individual we maintain our personal hygiene. Thus, home is the most mandatory place which needs to be cleaned. Our home cleaning services confirm the top notch services with the premium quality cleanser. Avail home cleaning service at least once in 3-6 months to maintain the cleanliness & hygiene of your home."
	}
	
]

function seedDB(){
   //Remove all services
   Service.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed services");
             //add a few services
            data.forEach(function(seed){
                Service.create(seed, function(err, service){
                    if(err){
                        console.log(err)
                    } else {
                        console.log("added a service");
                        }
            });
        });
    }); 
}
 
module.exports = seedDB;
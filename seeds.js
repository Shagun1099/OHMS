var mongoose = require("mongoose");
var Service = require("./models/services.js");

var data= [
	{
		name: "Mechanic service",
		sId:"mech",
		icon:"./mechIcon.png",
		image:"./Mech.jpg",
		subServices:[
			{  name:"Bike-Puncher",
			   image:"https://new-img.patrika.com/upload/2019/08/09/maxresdefault_1_4951544_835x547-m.jpg",
			   price:100},
			{  name:"Car-Puncher",
			   image:"https://www.edentyres.com/wp-content/uploads/2018/08/Eden-Tyres-Blog.jpg",
			   price:500},
			{  name:"Bike-service",
			   image:"https://www.clutchgarage.in/wp-content/uploads/2020/01/blog-hm-4-360x276.jpg",
			   price:1000},
			{  name:"Car-service",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTw9yRstyoKGNf_vzrmeef4g2BGICTy4S_Fzg&usqp=CAU",
			   price:1000},
			{  name:"others",
			   image:"https://www.drivespark.com/img/2019/05/top-10-selling-cars-india-1557219707.jpg",
			   price:2000}
			],
		options:["Bike-puncher","car-puncher","bike-service","car-service","others"],
		shortDescription:"Get the awesome mechanic services on your doorsteps,just by one click!!!",
		description:"You will have a really good first experience at OHMs. The technicians will be polite and explain everything in detail. They will do a thorough check and provide a   feasible solution. You will feel like you  got a little more for the price you paid. You Will surely visit again for further maintenance. we specialize in preventive maintenance and auto repair to maximize the life of your vehicle. Our technicians implement best practices for automotive maintenance and auto repair."
	},
	{
		name: "Plumber service",
		sId:"plum",
		icon:"./plumIcon.png",
		image:"./Plum.jpg",
		subServices:[
			{  name:"Basin&Sink",
			   image:"https://c1.wallpaperflare.com/preview/963/82/494/bathroom-clean-faucet-indoors-thumbnail.jpg",
			   price:100},
			{  name:"Bathroom",
			   image:"https://images.all-free-download.com/images/graphicthumb/bright_and_minimalist_bathroom_picture_167609.jpg",
			   price:500},
			{  name:"Toilet",
			   image:"https://darrinsplumbingtips.com/wp-content/uploads/2018/09/New-Toilet-Installation.jpg",
			   price:1000},
			{  name:"Tap",
			   image:"https://www.clipartkey.com/mpngs/m/291-2910937_water-photography-tap-sink-stock-free-hq-image.png",
			   price:1000},
			{  name:"Water-Tank",
			   image:"https://5.imimg.com/data5/GN/HD/MY-11039570/multicolored-water-tank-500x500.jpg",
			   price:1000},
			{  name:"Pipes",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTo9gdAikj_48C-MzyW2zgPXLniUZu21idgKA&usqp=CAU",
			   price:1000},
			{  name:"Blockage",
			   image:"https://s3-production.bobvila.com/articles/wp-content/uploads/2016/09/clog-sink.jpg",
			   price:1000},
			{  name:"others",
			   image:"https://img.pngio.com/plumbing-tools-70712-png-images-pngio-plumbing-png-500_500.png",
			   price:2000}
			],
		options:["basin&Sink","bathroom","toilet","tap","water-tank","Pipes","Blockage","others"],
		shortDescription:"Get the awesome plumber services on your doorsteps,just by one click!!!",
		description:"All our Service Providers are among the best in market, each having an experience of around 5 - 15 years in the domain and hence their quality is miles ahead of the local technicians. We don't  send random unverified service providers; all of them are background checked and police verified. Hence they are trusted and reliable. We ensure a guaranteed satisfaction on your job. We also offer 7 days warranty on the work done in case you are not satisfied. We would do the rework free of cost should a problem arise within 7 days of the work done by us."
	},
	{
		name: "Electrician-ing",
		sId:"elec",
		icon:"./elecIcon.png",
		image:"./Elec.jpg",
		subServices:[
			{  name:"Fan",
			   image:"https://images-na.ssl-images-amazon.com/images/I/41g9qIBH3fL.jpg",
			   price:100},
			{  name:"AC",
			   image:"https://freepngimg.com/thumb/air_conditioner/6-2-ac-picture-thumb.png",
			   price:500},
			{  name:"Washing Machine",
			   image:"https://5.imimg.com/data5/ZU/ZR/AL/SELLER-32037076/1-500x500.jpg",
			   price:1000},
			{  name:"Microwave",
			   image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/microwave-wattage-what-to-look-for-before-buying-1554472332.jpg?crop=0.6518xw:1xh;center,top&resize=480:*",
			   price:1000},
			{  name:"Inverter",
			   image:"https://5.imimg.com/data5/EF/YV/MY-11087096/microtek-external-battery-ups-715va-e2-model-invertor-500x500.png",
			   price:1000},
			{  name:"Refrigerator",
			   image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-fridges-2019-1569421093.png",
			   price:1000},
			{  name:"Cooler",
			   image:"https://5.imimg.com/data5/RM/AU/MY-5014525/iron-body-desert-cooler-500x500.jpg",
			   price:1000},
			{  name:"TV",
			   image:"https://4.imimg.com/data4/NA/RH/MY-12939916/24-inch-lg-led-tv-500x500.jpg",
			   price:1000},
			{  name:"Heater",
			   image:"https://images-na.ssl-images-amazon.com/images/I/71lmAW4D%2BIL._SX425_.jpg",
			   price:1000},
			{  name:"Gyser",
			   image:"https://5.imimg.com/data5/XH/JQ/DV/SELLER-46666070/gas-water-heater-250x250.jpg",
			   price:1000},
			{  name:"Swith&Socket",
			   image:"https://img.pngio.com/electrical-switch-png-1-png-image-electrical-switch-png-200_223.png",
			   price:1000},
			{  name:"Wiring",
			   image:"https://romanelectrichome.com/wp-content/uploads/2018/06/Roman-Electrical-Wiring-Tips-What-is-Hot-Neutral-and-Ground_Thumb-e1529674858612.jpg",
			   price:1000},
			{  name:"MCB/Fuse",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRgIpKuCtOERQimMn3qDVCJcEzNXLfpRNko_A&usqp=CAU",
			   price:1000},
			{  name:"others",
			   image:"https://us.123rf.com/450wm/citadelle/citadelle1508/citadelle150800099/44420429-tools-and-component-kit-to-use-in-electrical-installations.jpg?ver=6",
			   price:2000}
			],
		options:["fan","AC","washing machine","Microwave","Inverter","refrizerator","cooler","tv","Heater","gyser","switch&socket","wiring","MCB/fuse","others"],
		shortDescription:"Get the awesome electrician services on your doorsteps,just by one click!!!",
		description:"OHMS has in a short period of time earned an excellent reputation for its quality, efficiency and timely completion of both small and large electrical projects across the city his highly equipped office with the latest technological support is ready to meet all electrical contracting business in Software Facilities, Commercial Complex, Group Housing and Apartments, Factories and Industries, Biotechnology facilities, Hotels and Resorts, Educational Institutions as well as Sub Stations.Contact us fo ..."
	},
	{
		name: "WiFi Services",
		sId:"wifi",
		icon:"./wifiIcon.png",
		image:"./WiFi.png",
		subServices:[
			{  name:"Installation",
			   image:"https://www.cybrary.it/wp-content/uploads/2017/06/photodune-2258365-wifi-m.jpg",
			   price:100},
			{  name:"Maintenance",
			   image:"https://www.hellotech.com/blog/wp-content/uploads/2019/09/Why-is-My-WiFi-So-Slow-1.jpg",
			   price:500},
			{  name:"others",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS3K18RJbEhAnzMgVNuPmQ1V_HN825G4XFGzQ&usqp=CAU",
			   price:2000}
			],
		options:["installation","maintainance","others"],
		shortDescription:"Get the awesome WiFi services on your doorsteps,just by one click!!!",
		description:"OHMS are known to offer excellent wireless internet connections for any and every purpose. Their services are in demand from those who are looking to have it installed in their homes as well as by those who own business and office spaces. Over the years each of these set ups have made a name for themselves and because of this have been approached by numerous lifestyle centers as well for their services"
	},
	{
		name: "Mobile-Repair",
		sId:"mob",
		icon:"./mobIcon.png",
		image:"./Mob.jpg",
		options:[],
		shortDescription:"Get the awesome mobile-repair services on your doorsteps,just by one click!!!",
		description:"OHMS is the best place to get your phone repaired right at your doorstep! To get all details of your phone repair online, all you have to do is download the OHMS app and search for the model of your phone. With the help of our expertly trained technicians, you won’t have to worry about getting your phone repaired at all. "
	},
	{
		name: "Cable Services",
		sId:"cab",
		icon:"./cabIcon.png",
		image:"./Cab.jpg",
		subServices:[
			{  name:"Installation",
			   image:"https://timesofindia.indiatimes.com/thumb/msid-67632883,width-400,resizemode-4/67632883.jpg?imglength=124450",
			   price:100},
			{  name:"Maintenance",
			   image:"https://content3.jdmagicbox.com/comp/moradabad/e9/9999px591.x591.131031091501.d2e9/catalogue/kaptan-cable-tv-network-majhola-moradabad-cable-tv-operators-e0amvfj-250.jpg",
			   price:500},
			{  name:"others",
			   image:"https://image.roku.com/bWFya2V0aW5n/hiw-right.png",
			   price:2000}
			],
		options:["installation","others"],
		shortDescription:"Get the awesome cable services on your doorsteps,just by one click!!!",
		description:"Whether you’re moving and want to set up new service before you settle in or you're looking for alternatives to your current cable provider, OHMS can help. With just one call, you can set up cable TV service, high-speed internet service, phone service, and even home security services. Enter your zip code, choose the company you want in your area, and call to speak to one of our experts."
	},
	{
		name: "Carpenter-ing",
		sId:"car",
		icon:"./carIcon.png",
		image:"Car.jpg",
		subServices:[
			{  name:"Bed",
			   image:"https://rukminim1.flixcart.com/image/352/352/jk8lz0w0/bed/g/e/z/queen-na-particle-board-kosmo-mayflower-queen-bed-box-spacewood-original-imaf7mtfdv8hfg6z.jpeg?q=70",
			   price:100},
			{  name:"Furniture",
			   image:"https://cdn11.bigcommerce.com/s-30eq19trw2/images/stencil/500x659/products/24955/62977/1x900__11961.1571980318.jpg?c=2",
			   price:500},
			{  name:"Table/diningTable",
			   image:"https://www.ulcdn.net/opt/www.ulcdn.net/images/products/297414/slide/666x363/Danton_Kerry_Dining_Table_Set_MH_BO_1.jpg?1592209629",
			   price:1000},
			{  name:"Cupboard/Drawer",
			   image:"https://media.bunnings.com.au/Product-384x384/a082277c-ecf8-4afb-919c-854df723aba3.jpg",
			   price:1000},
			{  name:"Window/Door",
			   image:"https://img2.exportersindia.com/product_images/bc-full/2018/9/5866556/building-doors-1536817904-4295252.jpeg",
			   price:1000},
			{  name:"Chairs",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcRnzoCAgYKoKX-0TjBpWqVnlBR7Cpq7Z0xg&usqp=CAU",
			   price:1000},
			{  name:"Polishing",
			   image:"https://guptabrothersinteriorandexteriors.com/images/product/a7.jpg",
			   price:1000},
			{  name:"Repair",
			   image:"https://5.imimg.com/data5/VG/HY/ZF/SELLER-42234290/furniture-repairing-services-500x500.png",
			   price:1000},
			{  name:"others",
			   image:"https://marcellapurnama.files.wordpress.com/2011/11/carpenter-tools3.jpg",
			   price:2000}
			],
		options:["bed","furniture","table/diningTable","cupboard/drawer","window/door","chairs","polishing","repair","others"],
		shortDescription:"Get the awesome carpainter services on your doorsteps,just by one click!!!",
		description:"Why go looking for help when help can come to you? When it comes to carpentry work – be it furniture repairs or even making custom pieces, getting the right carpenter ensures that the work will be done in a timely manner and the finished product will look good.This can include repair work for cabinets and cardboards, creating shelves, replacing door hinges or making alterations. Looking for carpentry services online is easier than asking around for a local technician."
	},
	{
		name: "PEST-CONTROL",
		sId:"pest",
		icon:"./pestIcon.png",
		image:"./Pest.jpg",
		subServices:[
			{  name:"Cockroach-control",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQlBPKvMykSbOBfCpI1HMTen8pX7080MRgzPA&usqp=CAU",
			   price:100},
			{  name:"BedBugs Control",
			   image:"https://cdn.images.express.co.uk/img/dynamic/11/750x445/1151638.jpg",
			   price:500},
			{  name:"Ant Control",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRTXVz-_F8l1cIwcwPlmP361igd6UY5cGa5Gw&usqp=CAU",
			   price:1000},
			{  name:"Mosquito Control",
			   image:"https://www.sierraclub.org/sites/www.sierraclub.org/files/styles/flexslider_full/public/sierra/articles/big/2019-9-Mixed-Media-Mosquito-WB.jpg?itok=z3GdQ7Su",
			   price:1000},
			{  name:"HouseFlies Control",
			   image:"https://geneticliteracyproject.org/wp-content/uploads/2015/01/houseflies-copulating.jpg",
			   price:1000},
			{  name:"Rat Control",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTcB4Nl-SG3rqk3YooGu-fweK43S6W0cInfZw&usqp=CAU",
			   price:1000},
			{  name:"others",
			   image:"https://4.imimg.com/data4/JY/JP/MY-3976263/pest-control-service-250x250.jpg",
			   price:2000}
			],
		options:["cockroach-control","bedbugs-control","ant-control","mosquito-control","houseflies-control","rat-control","others"],
		shortDescription:"Get the awesome pest-control services on your doorsteps,just by one click!!!",
		description:"We render Pest Control and Management Measures using only Safe environment-friendly and non-polluting odor-free insecticides recommended by WHO or approved by CIB and organic repellants based on Bio- remedial measures. Highly customized treatment measures, that ensure total safety to human lives and the property, will be the basis of our pest management program since two properties are never alike. "
	},
	{
		name: "Laundry Services",
		sId:"laun",
		icon:"./launIcon.png",
		image:"./Laun.jpg",
		subServices:[
			{  name:"Washing",
			   image:"https://1stsourceservall.files.wordpress.com/2017/06/41796599_s.jpg?w=450",
			   price:100},
			{  name:"Iron",
			   image:"https://i2-prod.manchestereveningnews.co.uk/incoming/article13475439.ece/ALTERNATES/s615/childcarefundingJPG.jpg",
			   price:500},
			{  name:"Both",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSh9AOTOvHzojbQiqZJYP5lCiOJisTODqJA4g&usqp=CAU",
			   price:1000},
			{  name:"Dry Cleaning",
			   image:"https://images.theconversation.com/files/251043/original/file-20181217-185255-12ljky.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop",
			   price:1000},
			{  name:"others",
			   image:"https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dry-cleaning-at-home-1586555692.png?crop=0.505xw:1.00xh;0.236xw,0&resize=480:*",
			   price:2000}
			],
		options:["washing","iron","both","dry-cleaning","others"],
		shortDescription:"Get the awesome laundry services on your doorsteps,just by one click!!!",
		description:"The amount we charge is equivalent to the cost you bear to get the laundry done at your home.Our front loading machines consume 3 times less water than the conventional washing machinesYour clothes are delivered at your doorstep with the perfect crease.We schedule pickup and drop as per your convenience."
	},
	{
		name: "SANITISATION",
		sId:"san",
		icon:"./sanIcon.png",
		image:"./San.jpg",
		subServices:[
			{  name:"Home",
			   image:"https://assets1.chainstoreage.com/styles/primary_articles_short/s3/2020-03/Sanitize_1.jpg?itok=PN-bsGO2",
			   price:100},
			{  name:"Office",
			   image:"https://www.filta.ca/wp-content/uploads/filta-technician-office.jpg",
			   price:500},
			{  name:"others",
			   image:"https://simplegreen.com/images/news_media/disinfecting-dwell-time-large.jpg",
			   price:2000}
			],
		options:["home","office","others"],
		shortDescription:"Get the awesome sanitisation services on your doorsteps,just by one click!!!",
		description:"A quick-spreading and infectious virus is a serious situation. On top of spreading through human contact, often the bacteria and germs found in these viruses can live on surfaces and objects for up to two weeks. Along with refraining from close personal contact with infected people, it’s important to keep our daily environments safe and sanitized too."
	},
	{
		name: "Cleaning service",
		sId:"cle",
		icon:"./cleIcon.png",
		image:"./Cle.jpg",
		subServices:[
			{  name:"Home",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTyZ7wJjy20msucytc2xVhGweabM5GFpbIKuQ&usqp=CAU",
			   price:100},
			{  name:"Room",
			   image:"https://negosentro.com/wp-content/uploads/2019/11/house-cleaning-service.png",
			   price:500},
			{  name:"Kitchen",
			   image:"https://cdn.mrright.in/cdn/content/assets/2015-11/small/d9bf8899d965430087a0d8367ffa311b-kitchen%20cleaning.jpg",
			   price:1000},
			{  name:"Bathroom",
			   image:"https://cdn-www.ahs.com/cs/ahs/image/cleaning-bathroom.jpg",
			   price:1000},
			{  name:"Toilet",
			   image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR15g9Z-XFDX0zZQECWQMN4yRjdrjyLlMGRCA&usqp=CAU",
			   price:1000},
			{  name:"Office",
			   image:"https://cdn.virily.com/wp-content/uploads/2019/07/DIY-Cleaning.jpg",
			   price:1000},
			{  name:"others",
			   image:"https://images.ctfassets.net/gvcherscz0pq/pIah7CXLk46OwciCSWccO/e1ea97c8c360755a8a82611227035884/cleaning_tools.jpg",
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
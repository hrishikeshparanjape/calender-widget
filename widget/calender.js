function Calender (divString) {
	var calender = document.getElementById(divString);
	var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
	var days_of_a_week = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
	var now = new Date();
	var monthnumber = now.getMonth(), day = now.getDay(), date = now.getDate(), year = now.getFullYear();
	var firstday = new Date(year, monthnumber, 1), lastday = new Date(year,monthnumber+1,0);
					
	this.draw = function(){
		var calender_control = document.createElement("div");
		calender_control.id = "calender-control-bar";
		calender.appendChild(calender_control);
		var backbutton = document.createElement("div");
		backbutton.className = "buttondiv";
		backbutton.id = "backbtn";
		backbutton.innerHTML = "<";
		calender_control.appendChild(backbutton);
		var monthandyear = document.createElement("div");
		monthandyear.id = "calender-month";
		calender_control.appendChild(monthandyear);
		var frontbutton = document.createElement("div");
		frontbutton.className = "buttondiv";
		frontbutton.id = "frontbtn";
		frontbutton.innerHTML = ">";
		calender_control.appendChild(frontbutton);
		var calender_top_bar = document.createElement("div");
		calender_top_bar.id = "calender-top-bar";
		calender.appendChild(calender_top_bar);
		for (var i = 0; i<7;i++){
			var day_label = document.createElement("div");
			day_label.className = "day-label";
			day_label.innerHTML = days_of_a_week[i].slice(0,3);
			calender_top_bar.appendChild(day_label);
		}
		addDays(firstday,lastday);
		bindevents();
	};

	var bindevents = function(){
		document.getElementById("backbtn").addEventListener('click',previousmonth,false);
		document.getElementById("frontbtn").addEventListener('click',nextmonth,false);
	};

	function previousmonth(){
		var r = document.getElementById("calender-month").innerHTML.split(" ");
		var m = months.indexOf(r[0])-1;
		m=m==-1?11:m;
		var y = m==11?(parseInt(r[1])-1).toString():r[1]; 
		var d = new Date(months[m] + " 11, " + y);
		var monthnumber = d.getMonth(), day = d.getDay(), date = d.getDate(), year = d.getFullYear();
		var firstday = new Date(year, monthnumber, 1), lastday = new Date(year,monthnumber+1,0);
		addDays(firstday,lastday);
	}

	function nextmonth(){
		var r = document.getElementById("calender-month").innerHTML.split(" ");
		var m = (months.indexOf(r[0])+1)%12, y = m==0?(parseInt(r[1])+1).toString():r[1]; 
		var d = new Date(months[m] + " 11, " + y);
		var monthnumber = d.getMonth(), day = d.getDay(), date = d.getDate(), year = d.getFullYear();
		var firstday = new Date(year, monthnumber, 1), lastday = new Date(year,monthnumber+1,0);
		addDays(firstday,lastday);
	}
				
	var addDays = function(f,l){
		document.getElementById("calender-month").innerHTML = months[f.getMonth()] + " " + f.getFullYear();  
		if (document.getElementById("calender-days-bar")) {
			var calender_days = document.getElementById("calender-days-bar");
			calender_days.innerHTML = '';
		}
		else {
			var calender_days = document.createElement("div");
			calender_days.id = "calender-days-bar";
			calender.appendChild(calender_days);
		}
		var sunday = (8 - f.getDay())%7;
		for (var i = 0; i < f.getDay(); i++) {
			var calenderday = document.createElement("div");
			calenderday.className = "no-day";
			calender_days.appendChild(calenderday);
		}
		for (var i = 0; i < l.getDate(); i++) {
			var calenderday = document.createElement("div");
			calenderday.id = "day" + (i + 1);
			if ((i+1)%7==sunday || (i+1)%7==sunday-1 )
				calenderday.className = "weekend-day";
			else 
				calenderday.className = "calender-day";
			calender_days.appendChild(calenderday);
			calenderday.innerHTML = i + 1;
		}
		for (var i = 0; i < 42 - f.getDay() - l.getDate(); i++) {
			var calenderday = document.createElement("div");
			calenderday.className = "no-day";
			calender_days.appendChild(calenderday);
		}					
	};
}
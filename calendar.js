$(document).ready(function(){

    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];

    var startYear = 2010, endYear = 2025;

    var weekNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

    var birthdayCollection = [{dob:"1/3/2000", name:'Ram'}, {dob:"1/3/2000", name:'Ritik'}, {dob:"1/3/2000", name:'Vini'}, {dob:'1/9/2000', name:'Ragini'}, {dob:'1/14/2000', name:'Rohan'}, {dob:'2/26/2000', name:'Kanak'}, {dob:'5/9/2000', name:'Akshay'}, {dob:'9/12/2000', name:'Barkha'}, {dob:'10/5/2000', name:'Jiya'}, {dob:'11/17/2000',  name:'Ruchi'}, {dob:'12/4/2000', name:'Yogesh'}, {dob:'12/25/2000', name:'Diksha'}];

    createCalenderHeader();

    createCalenderContainer();

    prepareMonthHtml();

    prepareYearHtml();

    prepareWeekHtml();

    createCalender();

    allEvents();

    function createCalenderHeader() {
        $("body").html('<div class="container-wrapper"><div id="container" class="container"><div id="header" class="header"></div></div></div>');
        $('#header').html(`
        <h1>Calendar</h1> 
            <div class="arrow-link"><a href="javascript:void(0)" id="previous-month"><span class="glyphicon glyphicon-menu-left" aria-hidden="true"></span></a></div>
            <div class="dropdown-wrap">
            <select id="month-select" class="month-select">
            </select>
            <select id="year-select" class="month-select">
            </select>
            </div>
            <div class="arrow-link"><a href="javascript:void(0)" id="next-month"><span class="glyphicon glyphicon-menu-right" aria-hidden="true"></span></a></div>
        `);
    }

    function createCalenderContainer() {
        $('#container').append(`
        <div id="main-section" class="main-section">
            <div id="calender-wrap" class="calender-wrap">
                <div id="week-heading" class="week-heading clearfix">
                </div>
                <div id="all-weeks" class="all-weeks clearfix">
                </div>
            </div>
        </div>`);
    }  

    function prepareMonthHtml() {
        for (var i = 0; i < monthNames.length; i++) {
            $('#month-select').append(`<option value="${i}">${monthNames[i]}</option>`);
        }
    }
    
    function prepareYearHtml() {
        for (var i = startYear; i <= endYear; i++) {
            $('#year-select').append(`<option value="${i}">${i}</option>`);
        }
    }
    
    function prepareWeekHtml() {
        for (var i = 0; i < weekNames.length; i++) {
            $('#week-heading').append(`<div>${weekNames[i]}</div>`);
        }
    }
    
    function createCalender() {
        var d = new Date();
        var month = d.getMonth();
        var year = d.getFullYear();
        changeYearAndMonth(year, month)
    }  

    function changeYearAndMonth(year, month) {
        $("#month-select").val(month);
        $("#year-select").val(year);
        createTile(year, month);
    }

    function allEvents() {
        $('select').change(function() {
            selectYearMonth();
        })
    
        $('#previous-month').click(function() {
            previousMonth();
        })
    
        $('#next-month').click(function() {
            nextMonth();
        }) 
    }

    function selectYearMonth() {
        var month = $("#month-select").val();
        var year = $("#year-select").val();
        createTile(year, month);
    }

    function nextMonth() {
        var previousMonth = $("#month-select").val();
        var previousYear = $("#year-select").val();
        var previousDate = new Date(previousYear, previousMonth, 1);
        previousDate.setMonth(previousDate.getMonth()+1);
        var month = previousDate.getMonth();
        var year = previousDate.getFullYear();
        changeYearAndMonth(year, month) 
    }

    function previousMonth() {
        var previousMonth = $("#month-select").val();
        var previousYear = $("#year-select").val();
        var previousDate = new Date(previousYear, previousMonth, 1);
        previousDate.setMonth(previousDate.getMonth()-1);
        var month = previousDate.getMonth();
        var year = previousDate.getFullYear();
        changeYearAndMonth(year, month)
    }

    function createTile(year, month) {
        $('#all-weeks').empty();
        var dates = 32 - new Date(year, month, 32).getDate();
        for (var i = 0; i < dates; i++) {
            if (i == 0) {
                previousMonthDates(year, month);
            }
            var currentDate = new Date();
            if ((i+1) == currentDate.getDate() && currentDate.getMonth() == month && currentDate.getFullYear() == year) {
                $('#all-weeks').append(`<div id="day-of-week-${i+1}" class="day-of-week date-range active">${i+1}</div>`); 
            } else {
                $('#all-weeks').append(`<div id="day-of-week-${i+1}" class="day-of-week date-range">${i+1}</div>`); 
            }
            if (i == (dates - 1)) {
                nextMonthDates();
            }
        }
        dateRange();
        birthdays();
    }

    function previousMonthDates(year, month) {
        var firstDay = (new Date(year, month)).getDay();
        var currentMonth = new Date(year, month, 1);
        currentMonth.setMonth(currentMonth.getMonth()-1);
        var previousMonth = currentMonth;
        var previousFullYear = previousMonth.getFullYear();
        var previousMonthNumber = previousMonth.getMonth();
        var datesOfPreviousMonth = 32 - new Date(previousFullYear, previousMonthNumber, 32).getDate();
        let lastDayOfPreviousMonth = (new Date(previousFullYear, previousMonthNumber, datesOfPreviousMonth)).getDate();
        for (var j = (firstDay - 1); j >= 0; j--) {
            $('#all-weeks').append(`<div class="day-of-week greyed-tile">${lastDayOfPreviousMonth-j}</div>`);      
        }
    }

    function nextMonthDates() {
        var numberOfTiles = ($('.day-of-week')).length;
        var divisionBySeven = Math.ceil(numberOfTiles/7);
        var multipleOfSeven = divisionBySeven * 7;
        var numberOfNewTiles = multipleOfSeven - numberOfTiles;
        for (var j = 0; j < numberOfNewTiles; j++) {
            $('#all-weeks').append(`<div class="day-of-week greyed-tile">${j+1}</div>`);      
        }
    }

    function dateRange() {
        $('.date-range').on("click",function(){
            var selectedTile = "selected-tile";
            if($(this).hasClass(selectedTile)){
                $("."+selectedTile).removeClass(selectedTile);
            } else {
                var selected = $('.'+selectedTile).length;
                if(selected < 2){
                    $(this).addClass(selectedTile);
                    var selectedRange = $('.'+selectedTile).map(function(){ return + $(this).text() }).get();
                    for(var i = selectedRange[0]; i <= selectedRange[1]; i++){
                        $(`#day-of-week-${i}`).addClass(selectedTile);
                    }
                }else{
                    $("."+selectedTile).removeClass(selectedTile);
                    $(this).addClass(selectedTile);
                }
            }
            
        })
    }

    function birthdays() {
        for(var i = 0; i < birthdayCollection.length; i++){  
            var giftIcon = '<span class="glyphicon glyphicon-gift"></span>';
            var month = $("#month-select").val();
            var dobMonth = (new Date(birthdayCollection[i].dob)).getMonth();
            var dobDate = (new Date(birthdayCollection[i].dob)).getDate();
            var dayOfWeekId = '#day-of-week-'+dobDate;
            if( month == dobMonth){
                if($(dayOfWeekId).hasClass('birthday')) {
                    var popOpt = $(dayOfWeekId).data('bs.popover');
                    var popContent = popOpt.options.content;
                    var frontCut = popContent.replace("<strong>","");
                    var backCut = frontCut.replace("</strong>","");
                    $(dayOfWeekId).popover('destroy');
                    $(dayOfWeekId).popover({
                        "trigger": "hover",
                        title: '<strong>'+giftIcon+' Birthday</strong>',
                        content:`<strong>${backCut}, ${birthdayCollection[i].name}</strong>`,
                        html: true
                    })
                } else {
                    $(dayOfWeekId).addClass('birthday').popover({
                        "trigger": "hover",
                        title: '<strong>'+giftIcon+' Birthday</strong>',
                        content:`<strong>${birthdayCollection[i].name}</strong>`,
                        html: true
                    }).append(' '+giftIcon); 
                }
            }
        }
    }
});
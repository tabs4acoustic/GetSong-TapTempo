/*
* Lightweight Tap Tempo in Jquery
*
* Copyright 2015 GetSongBPM.com
* This project is licensed under the MIT License (see the LICENSE.md for details)
*/

	// Defaults
	var count = 0;
	var tapStart = 0;
	var tapPrevious = 0;
	var autoReset = 5; //in seconds
	var idleTime = 0;
	var defaultText = "Tap any Key";


	$("document").ready(function() {
		$(".avg_bpm").text( defaultText );
		$(".in_bpm").hide();
		var idleInterval = setInterval(idleIncrement, 1000);

		$(this).keydown(function (e) {
			idleTime = 0;
		});
	});

	$(document).on('keydown', function() {
		getTempo();
	});

	$(document).on("click", ".reset_gsTap", function() {
		resetTempo();
	});

	// Reset Counter
	function resetTempo()
	{
		count = 0;
		$(".avg_bpm").text( defaultText );
		$(".in_bpm").hide();
	}

	// Get BPM
	function getTempo()
	{
		tapTimer = $.now();

		if (count == 0) {
			tapStart = tapTimer;
			count = 1;

			$(".avg_bpm").text("1st");
			$(".in_bpm").show();
		} else {
			bpmAvg = 60000 * count / (tapTimer - tapStart);

			if(bpmAvg > 220)
				bpmAvg = 220;

			if(bpmAvg < 40)
				bpmAvg = 40;

			$(".avg_bpm").text( Math.round(bpmAvg) );
			count++;
		}

		tapPrevious = tapTimer;
	}

	// Auto-reset
	function idleIncrement() {
		idleTime = idleTime + 1;
		if (idleTime == autoReset)
			resetTempo();
	}

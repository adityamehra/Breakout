var gameHighScores = {
	persistence : (function () {

		var highScores = {
				first  : 0,
				second : 0,
				third  : 0,
				fourth : 0,
				fifth  : 0
				},
			previousScores = localStorage.getItem('gameHighScores.highScores');
		if (previousScores !== null) {
			highScores = JSON.parse(previousScores);
		}

		var highScoresArray = [highScores['first'], highScores['second'], highScores['third'], highScores['fourth'], highScores['fifth']];

		function add(value) {
			highScoresArray.push(value);

			highScoresArray.sort(function(a, b){return b-a});

			highScores['first'] = highScoresArray[0];
			highScores['second'] = highScoresArray[1];
			highScores['third'] = highScoresArray[2];
			highScores['fourth'] = highScoresArray[3];
			highScores['fifth'] = highScoresArray[4];

			localStorage['gameHighScores.highScores'] = JSON.stringify(highScores);
		}

		function remove() {
			highScores['first'] = 0;
			highScores['second'] = 0;
			highScores['third'] = 0;
			highScores['fourth'] = 0;
			highScores['fifth'] = 0;

			highScoresArray = [highScores['first'], highScores['second'], highScores['third'], highScores['fourth'], highScores['fifth']];

			localStorage['gameHighScores.highScores'] = JSON.stringify(highScores);
		}

    function report() {
			var scoreNode = document.getElementById("scoreTable"),
					scoreNode2 = document.getElementById("scoreTable2"),
				key;

			scoreNode.innerHTML = '';

			scoreNode2.innerHTML = '';

			for (key in highScores) {

					scoreNode.innerHTML += (highScores[key] + '<br/>');
					scoreNode2.innerHTML += (highScores[key] + '<br/>');

			}
			scoreNode.scrollTop = scoreNode.scrollHeight;
		}

		return {
			add : add,
			remove : remove,
			report : report
		};
	}())
};

function addValue(value) {
	gameHighScores.persistence.add(value);
	gameHighScores.persistence.report();
}

function reset() {
	gameHighScores.persistence.remove();
	gameHighScores.persistence.report();
}

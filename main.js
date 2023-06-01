    Webcam.set({
        width: 250,
        height: 200,
        image_format: 'jpeg',
        jpeg_quality: 90
    });

    var camera = document.getElementById("camera");
    Webcam.attach("#camera");

    function createPicture(){
        Webcam.snap(function(data_uri){
            document.getElementById("result").innerHTML = '<img id="picture" src="'+data_uri+'">';

        });
    }
    console.log("ml5 version:",ml5.version);

    var classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/9sTxqsY1C/model.json', modelLoaded);
    function modelLoaded(){
        console.log("Model Loaded");
    }

    function identifyPicture(){

        img = document.getElementById("picture");
        classifier.classify(img, gotResult);
    }

    function gotResult(error, results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            document.getElementById("object_name").innerHTML = results[0].label;
            document.getElementById("object_accuracy").innerHTML = results[0].confidence.toFixed(3);
        }
    }
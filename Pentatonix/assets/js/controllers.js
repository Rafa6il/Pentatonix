/* var videoElement = document.querySelector("video");
var textTracks = videoElement.textTracks; // one for each track element
var textTrack = textTracks[0]; // corresponds to the first track element
var kind = textTrack.kind // e.g. "subtitles" */

var trackElements = document.querySelectorAll("track");
// for each track element
for (var i = 0; i < trackElements.length; i++) {
    trackElements[i].addEventListener("load", function() {
        var textTrack = this.track; // gotcha: "this" is an HTMLTrackElement, not a TextTrack object
        var isMetadata = textTrack.kind === "metadata"; 
        // for each cue
        if(isMetadata) {
            //cada vez que cambie la cue se ejecuta esto
            textTrack.oncuechange = function () {
                // "this" is a textTrack
                var cue = null;
                if (this.activeCues.length == 1) {
                    cue = this.activeCues[0]; // assuming there is only one active cue
                }
                else {
                    cue = this.activeCues[1];
                }
                 
                //console.log(this.activeCues);
                var obj = JSON.parse(cue.text);

                actualizarVista(obj, cue.startTime);
            }        
        }
    });
}

actualizarVista = function(obj, start) {
    var titulo = obj.tittle;
    document.getElementById(titulo).innerHTML = titulo;
    var autor = obj.author;
    var year = obj.year;
    var linkYT = obj.href;
    // actualizar vista de descripcion de cancion (titulo, autor, año...)
    // actualizar vista de link de youtube
}
// Koppel het Handlebars-sjabloon aan de HTML
var resultatenTemplate = Handlebars.compile(document.querySelector('#resultaten-template').innerHTML);

// Verwerk het formulier bij het indienen
document.querySelector('#filter-button').addEventListener('click', function(opendefilteraub) {
  opendefilteraub.preventDefault();

  // Haal de geselecteerde filters op
  var sport
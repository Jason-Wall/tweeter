const hoverToggle = function(className) {
  this.on('mouseover', function() {
    toggleClass(className)
  });
};
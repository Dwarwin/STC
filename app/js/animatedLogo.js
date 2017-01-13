// Animated logo
let draw = SVG('drawing').size(45, 45),
    image = draw.image('img/logo.png');
image.size(45, 45);
image.mouseover(function () {
    this.animate(2000).rotate(360)
});

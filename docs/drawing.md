# Drawing

When you need to greatly customize the display, you can transfer your own implementation of the drawing functions

## Draw text

The `customTextDrawer` option accepts function which will be executed instead of default `drawText` function.

In the following example, the labels are drawn with bold n+1 lines:
```javascript
outlabels: {
  customTextDrawer(ctx) {
    var align = this.style.textAlign;
    var font = this.style.font;
    var lh = font.lineHeight;
    var color = this.style.color;
    var ilen = this.lines.length;
    var x, y, idx;

    if (!ilen || !color) {
      return;
    }

    x = this.textRect.x;
    y = this.textRect.y + lh / 2;

    if (align === 'center') {
      x += this.textRect.width / 2;
    } else if (align === 'end' || align === 'right') {
      x += this.textRect.width;
    }

    ctx.font = this.style.font.string;
    ctx.fillStyle = 'red';
    ctx.textAlign = align;
    ctx.textBaseline = 'middle';

    for (idx = 0; idx < ilen; ++idx) {
      ctx.font = idx > 0 ? 'bold 12px Noto Sans' : this.style.font.string;
      ctx.fillStyle = 'black';

      ctx.fillText(
        this.lines[idx],
        Math.round(x) + this.style.padding.left,
        Math.round(y),
        Math.round(this.textRect.width),
      );
      y += lh;
    }
  }
}

## Draw line
The `customLineDrawer` option accepts function which will be executed instead of default `drawLine` function. It works the same way as the `customTextDrawer`.

In the following example, the lines are drawn starting not from the border but from 15 pixels to the border
```javascript
outlabels: {
  lineColor: 'black',
  lineWidth: 1,
  customLineDrawer(ctx) {
    if (!this.lines.length) {
      return;
    }
    ctx.save();

    var angle = (this.center.arc.startAngle + this.center.arc.endAngle) / 2;
    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);
    var d = this.center.arc.outerRadius - 15;
    var x = this.center.arc.x + cosA * d;
    var y = this.center.arc.y + sinA * d;

    ctx.strokeStyle = this.style.lineColor;
    ctx.lineWidth = this.style.lineWidth;
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(this.center.copy.x, this.center.copy.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.center.copy.x, this.center.copy.y);
    var xOffset = this.textRect.width + this.style.padding.width;
    var intersect = this.intersects(
      this.textRect,
      {
        x: this.textRect.x + this.textRect.width,
        y: this.textRect.y + this.textRect.height,
      },
      this.center.copy,
      {
        x: this.textRect.x,
        y: this.textRect.y + this.textRect.height / 2,
      },
    );
    ctx.lineTo(this.textRect.x + (intersect ? xOffset : 0), this.textRect.y + this.textRect.height / 2);
    ctx.stroke();
    ctx.restore();
  }
}
```
```
```
## Draw label
The `customLabelDrawer` option accepts function which will be executed instead of default `drawLabel` function. It works the same way as the `customTextDrawer`.

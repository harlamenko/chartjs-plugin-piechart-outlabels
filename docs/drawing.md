# Drawing

When you need to greatly customize the display, you can transfer your own implementation of the drawing functions

## Draw text

The `customTextDrawer` option accepts function which will be executed instead of default `drawText` function.

Next example draw label with bold n+1 lines:
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
```
## Draw label
The `customLabelDrawer` option accepts function which will be executed instead of default `drawLabel` function. It works the same way as the `customTextDrawer`.

## Draw line
The `customLineDrawer` option accepts function which will be executed instead of default `drawLine` function. It works the same way as the `customTextDrawer`.

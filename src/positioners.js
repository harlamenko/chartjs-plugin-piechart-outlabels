'use strict';

export default {
  center: function(arc, stretch, stretchOffset) {
    var angle = (arc.startAngle + arc.endAngle) / 2;
    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);
    var d = arc.outerRadius + stretchOffset;
    var stretchedD = d + stretch + (stretchOffset * Math.sign(stretchOffset));

    return {
      x: arc.x + cosA * stretchedD,
      y: arc.y + sinA * stretchedD,
      d: stretchedD,
      arc: arc,
      anchor: {
        x: arc.x + cosA * d,
        y: arc.y + sinA * d,
      },
      copy: {
        x: arc.x + cosA * stretchedD,
        y: arc.y + sinA * stretchedD
      },
      angle: angle
    };
  },

  moveFromAnchor: function(center, positioningStrategy, dist) {
    var arc = center.arc;
    var d = center.d;
    var angle = center.angle;

    if (positioningStrategy === 'shift') {
      angle += (0.05);
    }

    var cosA = Math.cos(angle);
    var sinA = Math.sin(angle);

    if (dist) {
      d += dist;
    }

    return {
      x: arc.x + cosA * d,
      y: arc.y + sinA * d,
      d: d,
      arc: arc,
      anchor: center.anchor,
      copy: {
        x: arc.x + cosA * d,
        y: arc.y + sinA * d
      },
      angle: angle
    };
  }
};

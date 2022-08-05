/// App.js ///
class App extends Component {
    style = {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
    }

    onWheel(d, vChange, hChange) {
        d.nodes.forEach(t => {
            t.r += vChange > 0 ? 5 : -5;
            t.r = Math.min(100, Math.max(15, t.r)); // 15~100
        })
    }

    onDrag(d) {
        d.nodes.forEach(t => {
            t.x += d3.event.dx;
            t.y += d3.event.dy;
        })
    }

    onClick(d) {
        const color = ['magenta', 'cyan', 'pink', 'brown', 'yellow'][Math.floor(Math.random() * 5)];

        console.log(d3.event)
        d.nodes.push({
            x: d3.event.offsetX,
            y: d3.event.offsetY,
            r: Math.random() * 80 + 20,
            shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
            color
        });
        if (d.selectedNode >= 0) {
            d.links.push([d.selectedNode, d.nodes.length - 1, color]);
        } else {
            d.links.push([Math.floor(Math.random() * (d.nodes.length - 2)), d.nodes.length - 1, color]);
        }
    }
}
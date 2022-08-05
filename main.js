
const state = {
    nodes: [
        { x: 110, y: 210, r: 15, shape: 'circle', color: 'red' },
        { x: 110, y: 300, r: 25, shape: 'rect', color: 'green' },
        { x: 200, y: 210, r: 35, shape: 'circle', color: 'orange' },
        { x: 300, y: 400, r: 50, shape: 'rrect', color: 'violet' },
        { x: 410, y: 250, r: 15, shape: 'circle', color: 'red' },
        { x: 410, y: 300, r: 25, shape: 'rect', color: 'green' },
        { x: 500, y: 210, r: 35, shape: 'circle', color: 'orange' },
        { x: 150, y: 400, r: 50, shape: 'rrect', color: 'violet' },
    ],
    links: [
        [0, 1],
        [1, 2],
        [2, 0, 'red'],
        [0, 3, 'violet'],
        [1, 3, 'violet'],
        [2, 3, 'violet'],
        [2, 5],
        [2, 6],
        [2, 7],
        [2, 4, 'orange']],
    selectedNode: -1,
    selectedLine: -1
}

const app = new App(null, 'app');

app.addChildRule(Node, (state) => {
    return state.nodes.map((d, ix) => {
        return Object.assign(d, {
            isSelected: ix === state.selectedNode,
            setSelected: () => { state.selectedNode = ix }
        });
    })
})

app.addChildRule(Link, (state) => {
    return state.links.map(([n0, n1, color = 'blue'], ix) => {
        return {
            x0: state.nodes[n0].x,
            y0: state.nodes[n0].y,
            x1: state.nodes[n1].x,
            y1: state.nodes[n1].y,
            color,
            isSelected: state.selectedLine === ix,
            setSelected: () => { state.selectedLine = ix }
        }
    })
})

function refresh() {
    app.render(state, refresh);
}
refresh();

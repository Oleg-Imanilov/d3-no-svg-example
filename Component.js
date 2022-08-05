/// Component.js ///

class Component {
    constructor(parent, className, tag) {
        this.parent = parent || d3.select("#workspace");
        this.className = className;
        this.tag = tag || 'span';
        this.style = {};
        this.children = [];
    }

    getFirst() {
        return this.getAll()[0];
    }

    getAll() {
        return this.parent.selectAll("." + this.className);
    }

    render(data, refresh) {
        const n = this.getAll()
            .data(Array.isArray(data) ? data : [data])
            .enter()
            .append(this.tag)
            .attr("class", this.className)
            .on("wheel.zoom", (d) => {
                d3.event.stopPropagation();
                this.onWheel(d, d3.event.wheelDeltaY, d3.event.wheelDeltaX);
                refresh();
            }).on("contextmenu", (d) => {
                d3.event.preventDefault();
                this.onRightClick(d);
                refresh();
            }).on("click", (d) => {
                this.onClick(d);
                refresh();
            });

        d3.drag().on('drag', (f) => {
            this.onDrag(f, d3.event);
            refresh();
        })(n);

        for (let attr in this.style) {
            n.style(attr, this.style[attr]);
        }

        // Select again, after added/removed
        this.update(this.getAll());

        this.children.forEach(([ch, subState]) => {
            ch.render(subState(data), refresh);
        });
    }

    // @Abstract
    // Update properties related to data
    update(n) { }

    // @Abstract
    onDrag(d) { }

    // @Abstract
    onWheel(d, vChange, hChange) { }

    // @Abstract
    onRightClick(d) { }

    // @Abstract
    onClick(d) { }

    addChildRule(component, subState) {
        this.children.push([new component(this.getFirst()), subState]);
    }
}
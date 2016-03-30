/// <reference path="../libs.d.ts" />

require('d3');
require('./d3-component.scss');

declare var d3;

import {
    Component,
    AfterContentInit,
    ElementRef
} from 'angular2/core';

@Component({
    selector: 'd3-component',
    template: require('./d3-component.html')
})

export class D3Component implements AfterContentInit {
    constructor(private element: ElementRef) {
        // no-op
    }
    
    ngAfterContentInit() {
        this.barChart();    
    }
    
    // credit: https://strongriley.github.io/d3/tutorial/bar-1.html
    private barChart() {
        var data = [4, 8, 15, 16, 23, 42];
        var x = d3.scale.linear()
            .domain([0, d3.max(data)])
            .range([0, 420]);

        var y = d3.scale.ordinal()
            .domain(data)
            .rangeBands([0, 120]);
                
        var chart = d3.select(this.element.nativeElement)
            .append("svg:svg")
            .attr("class", "chart")
            .attr("width", 440)
            .attr("height", 140)
            .append("svg:g")
            .attr("transform", "translate(10,15)");

        chart.selectAll("rect")
            .data(data)
            .enter().append("svg:rect")
            .attr("y", y)
            .attr("width", x)
            .attr("height", y.rangeBand());

        chart.selectAll("text")
            .data(data)
            .enter().append("svg:text")
            .attr("x", x)
            .attr("y", function(d) { return y(d) + y.rangeBand() / 2; })
            .attr("dx", -3) // padding-right
            .attr("dy", ".35em") // vertical-align: middle
            .attr("text-anchor", "end") // text-align: right
            .text(String);

        chart.selectAll("line")
            .data(x.ticks(10))
            .enter().append("svg:line")
            .attr("x1", x)
            .attr("x2", x)
            .attr("y1", 0)
            .attr("y2", 120)
            .attr("stroke", "#ccc");

        chart.selectAll("text.rule")
            .data(x.ticks(10))
            .enter()
            .append("svg:text")
            .attr("class", "rule")
            .attr("x", x)
            .attr("y", 0)
            .attr("dy", -3)
            .attr("text-anchor", "middle")
            .text(String);

        chart.append("svg:line")
            .attr("y1", 0)
            .attr("y2", 120)
            .attr("stroke", "#000");
    }
}
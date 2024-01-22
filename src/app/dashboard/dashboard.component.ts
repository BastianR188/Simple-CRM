import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import ApexCharts from 'apexcharts';
import { filter } from 'rxjs';
import {
  optionDonut,
  spark1,
  spark2,
  spark3,
  optionsArea,
  optionsBar,
  optionsLine,
} from '../charts-options';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements AfterViewInit, OnInit {
  @ViewChild('wrapper') wrapper: ElementRef | undefined;
  constructor(private router: Router) {
    this.spark1 = spark1;
    this.spark2 = spark2;
    this.spark3 = spark3;
    this.optionsArea = optionsArea;
    this.optionsBar = optionsBar;
    this.optionsLine = optionsLine;
    this.optionDonut = optionDonut;
    const time = new Date().getHours();
    if (time < 12) {
      this.greeting = 'Good morning';
    } else if (time < 18) {
      this.greeting = 'Good afternoon';
    } else {
      this.greeting = 'Good evening';
    }
  }
  isLinkActive(route: string) {
    return this.router.url === route;
  }
  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.removeAllCharts();
      });
  }
  greeting: string;
  charts: ApexCharts[] = [];
  spark1: any;
  spark2: any;
  spark3: any;
  optionsArea: any;
  optionsBar: any;
  optionsLine: any;
  optionDonut: any;
  initializeChart(selector: string, data: any): ApexCharts {
    return new ApexCharts(document.querySelector(selector), data);
  }
  renderChart(chart: ApexCharts): void {
    chart.render();
    this.addChart(chart);
  }
  addChart(chart: ApexCharts) {
    this.charts.push(chart);
  }
  removeAllCharts() {
    this.charts.forEach((chart) => {
      chart.destroy();
    });
    this.charts = [];
  }
  ngAfterViewInit(): void {}

  private renderAllCharts(
    spark1: ApexCharts,
    spark2: ApexCharts,
    spark3: ApexCharts,
    chartArea: ApexCharts,
    monthlyEarningsChart: ApexCharts,
    donut: ApexCharts,
    chartLine: ApexCharts
  ) {
    this.renderChart(spark1);
    this.renderChart(spark2);
    this.renderChart(spark3);
    this.renderChart(chartArea);
    this.renderChart(monthlyEarningsChart);
    this.renderChart(donut);
    chartLine.render().then(() => {
      this.addChart(chartLine);
      if (this.wrapper) {
        const ifr = this.wrapper.nativeElement;
        if (ifr.contentDocument) {
          ifr.style.height = ifr.contentDocument.body.scrollHeight + 20 + 'px';
        }
      }
    });
  }

  private initializeAllCharts() {
    const spark1 = this.initializeChart('#spark1', this.spark1);
    const spark2 = this.initializeChart('#spark2', this.spark2);
    const spark3 = this.initializeChart('#spark3', this.spark3);
    const chartArea = this.initializeChart('#area', this.optionsArea);
    const monthlyEarningsChart = this.initializeChart('#bar', this.optionsBar);
    const donut = this.initializeChart('#donut', this.optionDonut);
    const chartLine = this.initializeChart('#line', this.optionsLine);
    return {
      spark1,
      spark2,
      spark3,
      chartArea,
      monthlyEarningsChart,
      donut,
      chartLine,
    };
  }
}

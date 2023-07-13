import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { AuthService } from 'src/app/auth/auth.service';
import { PacienteService } from 'src/app/feature/pacientes/paciente.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css'],
})
export class LineChartComponent implements OnInit {
  loading: boolean = true;

  years: any[] = [];
  currentYear: number = new Date().getFullYear();

  lineChartData: ChartDataSets[] = [{ data: [], label: '' }];
  lineChartLabels: Label[] = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];

  lineChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          align: 'start',
          position: 'left',
        },
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontStyle: 'normal',
            fontSize: 13,
            beginAtZero: true,
            stepSize: 1,
            min: 0,
          },
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            fontStyle: 'normal',
            fontSize: 13,
            autoSkip: false,
            maxRotation: window.innerWidth < 1100 ? 90 : 0,
            minRotation: window.innerWidth < 1100 ? 90 : 0,
          },
          gridLines: {
            drawOnChartArea: false,
            lineWidth: 1.5,
          },
        },
      ],
    },
    hover: {
      mode: 'point',
      intersect: true,
    },
    tooltips: {
      backgroundColor: '#3f51b5',
      titleFontColor: '#ffffff',
      bodyFontColor: '#ffffff',
      borderWidth: 0,
      caretSize: 6,
      cornerRadius: 4,
      xPadding: 10,
      yPadding: 10,
      displayColors: false,
      callbacks: {
        label: (tooltipItem) => {
          return `Pacientes: ${tooltipItem.yLabel}`;
        },
      },
    },
  };
  lineChartColors: Color[] = [
    {
      pointRadius: 5,
      backgroundColor: 'transparent',
      borderColor: '#4051b5',
      pointBackgroundColor: '#fff',
      pointBorderColor: '#4051b5',
      pointHoverBackgroundColor: '#4051b5',
      pointHoverBorderColor: '#4051b5',
      pointBorderWidth: 2,
    },
  ];
  lineChartLegend = false;
  lineChartType: ChartType = 'line';

  constructor(
    private pacienteService: PacienteService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getLineChartData(new Date().getFullYear());
  }

  public getLineChartData(year: number) {
    if (this.authService.isAuthorized(['LEER_PACIENTES'])) {
      this.pacienteService
        .getPatientsPerMonthPerYear(year)
        .subscribe((res: any) => {
          if (res.status === 'success') {
            this.lineChartData = res.data.result;
            this.currentYear = year;
            this.years = res.data.patientYears;
          }

          this.loading = false;
        });
    }
  }
}

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { WasteCollection } from '../midleware/Api';
import { LoginStore } from '../store/Store';

interface MonthDataSeries {
  prices: number[];
  dates: string[];
}

interface SeriesType {
  name: string;
  data: number[];
}

interface ChartMapProps {
  start_date: string | null,
  end_date: string | null,
  waste_type_id: number | null
}

const monthDataSeries1: MonthDataSeries = {
  prices: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  dates: [
    '2018-09-19T00:00:00.000Z',
    '2018-09-20T01:30:00.000Z',
    '2018-09-21T02:30:00.000Z',
    '2018-09-22T03:30:00.000Z',
    '2018-09-23T04:30:00.000Z',
    '2018-09-24T05:30:00.000Z',
    '2018-09-25T06:30:00.000Z',
    '2018-09-26T07:30:00.000Z',
    '2018-09-27T08:30:00.000Z'
  ]
};


const ChartMap: React.FC<ChartMapProps> = ({ start_date, end_date, waste_type_id}) => {
  const { token } = LoginStore()
  const currentDate = new Date()
  const defaultPropData = () => {
    start_date = start_date ? start_date : new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
    end_date = end_date ? end_date : currentDate.toISOString()
  }
  
  const getWasteCollection = async () => {
    const response = await WasteCollection.GetAllFilter(token)
  }
  const generateRawArray = (length: number) => {
    return Array.from({ length }, () => 0);
  }
  const [series] = useState<SeriesType[]>([
    {
      name: "Plastik (gram)",
      data: monthDataSeries1.prices
    }
  ]);



  const [options] = useState<ApexOptions>({
    chart: {
      type: 'area',
      height: 400,
      zoom: {
        enabled: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Perolehan Sampah Plastik',
      align: 'left'
    },

    labels: monthDataSeries1.dates,
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: 'right'
    }
  });

  // const getWasteType(){

  // }

  return (
    <div>
      <div id="chart" className=''>
        <ReactApexChart options={options} series={series} type="area" height={450} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default ChartMap;

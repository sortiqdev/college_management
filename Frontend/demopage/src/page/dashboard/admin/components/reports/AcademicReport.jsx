import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Spin } from 'antd';
import API from '../../../../../services/api';
import { STUDENT_DATA } from '../../../../../mock/mockData';

const AcademicReport = () => {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      try {
        const res = await API.get('/reports/academic');
        setReport(res.data);
      } catch (err) {
        // Backend not ready — build a simple report from mock data
        console.warn('Reports API not ready, using mock data', err);
        const totalStudents = STUDENT_DATA.attendance?.overall?.total ?? 0;
        const currentYear = new Date().getFullYear();

        // create mock registrations per year (last 5 years)
        const byYear = [];
        for (let i = 4; i >= 0; i--) {
          const y = currentYear - i;
          byYear.push({ year: y, count: Math.max(5, Math.floor((totalStudents / (i + 2)) + (i * 3))) });
        }

        // mock admissions this month and registrations this year
        const registrationsThisYear = byYear.find((r) => r.year === currentYear)?.count ?? 0;
        const admissionsThisMonth = Math.max(1, Math.floor(registrationsThisYear / 12));

        // monthly breakdown (last 6 months)
        const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        const byMonth = months.slice(0,6).map((m, idx) => ({ month: m, count: Math.max(0, Math.floor(registrationsThisYear / 6) + (idx % 2 === 0 ? 1 : -1)) }));

        setReport({ totalStudents, registrationsThisYear, admissionsThisMonth, byYear, byMonth });
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) return <Spin />;

  const columnsYear = [
    { title: 'Year', dataIndex: 'year', key: 'year' },
    { title: 'Registrations', dataIndex: 'count', key: 'count' },
  ];

  const columnsMonth = [
    { title: 'Month', dataIndex: 'month', key: 'month' },
    { title: 'Admissions', dataIndex: 'count', key: 'count' },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-6">
        <Row gutter={16}>
          <Col span={8}>
            <Card>
              <Statistic title="Total Students" value={report.totalStudents} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Registrations (This Year)" value={report.registrationsThisYear} />
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <Statistic title="Admissions (This Month)" value={report.admissionsThisMonth} />
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col lg={12} sm={24}>
            <Card title="Registrations by Year">
              <Table dataSource={report.byYear} columns={columnsYear} pagination={false} rowKey={(r) => r.year} />
            </Card>
          </Col>

          <Col lg={12} sm={24}>
            <Card title="Admissions (Recent Months)">
              <Table dataSource={report.byMonth} columns={columnsMonth} pagination={false} rowKey={(r, i) => i} />
            </Card>
          </Col>
        </Row>

      </div>
    </div>
  );
};

export default AcademicReport;
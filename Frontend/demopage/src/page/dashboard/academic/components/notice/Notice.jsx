import React from "react";
import { Tabs, Card } from "antd";
import NoticeCreate from "./NoticeCreate";
import NoticeView from "./NoticeView";

const { TabPane } = Tabs;

export default function Notice() {
  return (
    <Card
      title="Notice Board"
      style={{
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      <Tabs defaultActiveKey="1">

        <TabPane tab="View Notices" key="1">
          <NoticeView />
        </TabPane>

        <TabPane tab="Create Notice" key="2">
          <NoticeCreate />
        </TabPane>

      </Tabs>
    </Card>
  );
}
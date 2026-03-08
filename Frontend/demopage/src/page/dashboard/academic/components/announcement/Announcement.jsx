import React from "react";
import { Tabs, Card } from "antd";
import AnnouncementCreate from "./AnnoucementCreate";
import AnnouncementView from "./AnnouncementView";

const { TabPane } = Tabs;

export default function Announcement() {
  return (
    <Card
      title="Announcements"
      style={{
        borderRadius: 10,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
      }}
    >
      <Tabs defaultActiveKey="1">
        
        <TabPane tab="View Announcements" key="1">
          <AnnouncementView />
        </TabPane>

        <TabPane tab="Create Announcement" key="2">
          <AnnouncementCreate />
        </TabPane>

      </Tabs>
    </Card>
  );
}
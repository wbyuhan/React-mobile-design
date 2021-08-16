import React, { useState } from "react";
import { Icon, TabBar, Cell, Button } from 'zarm';


const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_1340918_lpsswvb7yv.js');


const Home:React.FC = () => {
  const [activeKey, setActiveKey] = useState<number | string | undefined>('home');
  const [visible, setVisible] = useState<boolean>(true);

  return <>
      <Cell
        description={
          <Button
            size="xs"
            onClick={() => {
              setVisible(!visible);
            }}
          >
            {visible ? '隐藏' : '展示'}
          </Button>
        }
      >
        隐藏 | 展示
      </Cell>

      <TabBar visible={visible} activeKey={activeKey} onChange={(value?: number | string) =>setActiveKey(value)}>
        <TabBar.Item itemKey="home" title="主页" icon={<TabIcon type="home" />} />
        <TabBar.Item
          itemKey="found"
          title="保险"
          icon={<TabIcon type="insurance" />}
          badge={{ shape: 'circle', text: '3' }}
        />
        <TabBar.Item
          itemKey="me"
          title="我的"
          icon={<TabIcon type="user" />}
          badge={{ shape: 'dot' }}
        />
      </TabBar>
    </>
};

export default Home;

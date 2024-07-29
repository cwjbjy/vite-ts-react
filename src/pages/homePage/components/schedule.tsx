import { Table, Tag, Card } from 'antd';
import styled from 'styled-components';

const { Column } = Table;

const data = [
  {
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
  {
    key: '4',
    firstName: 'Joe',
    lastName: 'Amin',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['nice', 'teacher'],
  },
  {
    key: '5',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const Schedule = () => {
  return (
    <Wrapper>
      <Card hoverable style={{ height: 449 }} title="人员列表" className="schedule">
        <Table dataSource={data} pagination={false}>
          <Column title="Name" dataIndex="lastName" key="lastName" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={(tags: string[]) => (
              <>
                {tags.map((tag) => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </>
            )}
          />
        </Table>
      </Card>
    </Wrapper>
  );
};

export default Schedule;

const Wrapper = styled.div`
  .schedule {
    .ant-card-body {
      padding-top: 14px;
    }
  }
`;

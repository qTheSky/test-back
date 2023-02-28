export type EmployeeViewModel = {
  id: number;
  name: string;
  info: {
    education: {
      title: string;
      id: number;
    };
    position: {
      title: string;
      id: number;
    };
  };
};

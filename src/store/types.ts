export interface CompanyProps {
  name: string;
  ceo: string;
  founder: string;
  founded: string;
  headquarters: {
    city: string;
    state: string;
  };
  summary: string;
  employees: number;
  launch_sites: number;
  valuation: number;
}

export interface SpaceShipProps {
  image: string;
  name: string;
  roles: string[];
  active: string;
  home_port: string;
}

export interface QuestionProps {
  name: string;
  description: string;
  createdAt: string;
  _id: string;
}

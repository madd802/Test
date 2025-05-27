import { useEffect, useState } from "react";
type CustomersListQueryResponseCategory = {
code: string;
description: string;
}
type CustomersListQueryResponse = {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  iban: string;
  category?: CustomersListQueryResponseCategory;
}
export default function CustomerListPage() {
      const [list, setList] = useState<CustomersListQueryResponse[]>([]);
    useEffect(() => {
        fetch("/api/customers/list")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setList(data as CustomersListQueryResponse[]);
          });
      }, []);
    return <>
        <div>{JSON.stringify(list)}</div>
    </>
}
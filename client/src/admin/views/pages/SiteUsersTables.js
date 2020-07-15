import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
// import "./styles.css";
import { MembersContext } from "admin/context/MembersContext";


const removeItem = (array, item) => {
  const newArray = array.slice();
  newArray.splice(newArray.findIndex(a => a === item), 1);

  return newArray;
};

const SiteUsersTable = () => {
    const {memberState:{members,totalMembers}} = useContext(MembersContext)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // const [deleted, setDeleted] = useState([]);

    const fetchUsers = async (page, size = perPage) => {
        setLoading(true);

        const response = await axios.get(
        `https://reqres.in/api/users?page=${page}&per_page=${size}&delay=1`
        );

        setData(response.data.data);
        setTotalRows(response.data.total);
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers(1);
    }, []);

    const handleDelete = useCallback(
        row => async () => {
        await axios.delete(`https://reqres.in/api/users/${row.id}`);
        const response = await axios.get(
            `https://reqres.in/api/users?page=${currentPage}&per_page=${perPage}`
        );

        setData(removeItem(response.data.data, row));
        setTotalRows(totalRows - 1);
        },
        [currentPage, perPage, totalRows]
    );

    const columns = useMemo(
        () => [
        {
            name: "First Name",
            selector: "firstName",
            sortable: true
        },
        {
            name: "Last Name",
            selector: "lastName",
            sortable: true
        },
        {
            name: "Email",
            selector: "email",
            sortable: true
        },
        {
            // eslint-disable-next-line react/button-has-type
            cell: row => <button onClick={handleDelete(row)}>Delete</button>
        }
        ],
        [handleDelete]
    );

    const handlePageChange = page => {
        fetchUsers(page);
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        fetchUsers(page, newPerPage);
        setPerPage(newPerPage);
    };

    return (
        <DataTable
        title="GDI Subscribers"
        columns={columns}
        data={members}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalMembers}
        paginationDefaultPage={currentPage}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        />
    );
};
export default SiteUsersTable

import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
// import "./styles.css";
import { MembersContext } from "admin/context/MembersContext";
import { LOADMOREMEMBERS } from "admin/actions/actions";


const removeItem = (array, item) => {
  const newArray = array.slice();
  newArray.splice(newArray.findIndex(a => a === item), 1);

  return newArray;
};

const GDIMembersTable = () => {
    const {memberState:{members,totalMembers}, dispatch} = useContext(MembersContext)
    const [data, setData] = useState(members.slice(0,10))
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // const [deleted, setDeleted] = useState([]);

    const fetchMoreMembers = async () => {
        if(members.length < totalMembers){
            setLoading(true);
            const lastMember = members.slice(-1)[0]
            try {
                const response = await axios.get(`/loadMoreMembers?lastMember=${lastMember.member_id}`);
                dispatch({type:LOADMOREMEMBERS,payload: response.data.members})

            } catch (error) {
                if(error.response){
                    console.log(error.response.data)
                }
            }
            setLoading(false);
            return
        }
        alert("Finished fetching members")
    };

    const columns = useMemo(
        () => [
            {
                name: "S/No",
                selector: "member_id",
                sortable: true
            },
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
            }
        ],
        []
    );

    const handlePageChange = page => {
        const availableMembers = parseInt(perPage * page)
        if(availableMembers > members.length || availableMembers === members.length){
            fetchMoreMembers()
        }
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        const availableMembers = parseInt(newPerPage * page)
        if(availableMembers > members.length || availableMembers === members.length){
            fetchMoreMembers()
        }   
        setPerPage(newPerPage);
    };

    return (
        <DataTable
        title="GDI Subscribers"
        columns={columns}
        data={members}
        progressPending={loading}
        pagination
        paginationTotalRows={totalMembers}
        paginationDefaultPage={currentPage}
        paginationRowsPerPageOptions={[10,15,20,25,30,40,50,100,200]}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        />
    );
};
export default GDIMembersTable

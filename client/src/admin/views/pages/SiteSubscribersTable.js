import React, { useState, useEffect, useCallback, useMemo, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
// import "./styles.css";
import { NewsletterContext } from "admin/context/NewsletterContext";
import { LOAD_MORE_SUBSCRIBERS } from "admin/actions/actions";
import { DELETE_SUBSCRIBER } from "admin/actions/actions";


const removeItem = (array, item) => {
  const newArray = array.slice();
  newArray.splice(newArray.findIndex(a => a === item), 1);
  return newArray;
};

const SiteSubscribersTable = () => {
    const {mainState:{siteSubscribers,totalSubscribers}, dispatch} = useContext(NewsletterContext)
    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    // const [deleted, setDeleted] = useState([]);

    const fetchMoreMembers = async () => {
        if(siteSubscribers.length < totalSubscribers){
            setLoading(true);
            const lastSubscriber = siteSubscribers.slice(-1)[0]
            try {
                const response = await axios.get(`/loadMoreSubscribers?lastSubscriber=${lastSubscriber.id}`);
                dispatch({type:LOAD_MORE_SUBSCRIBERS,payload: response.data.subscribers})

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

    const handleDelete = useCallback(
        row => async () => {
            console.log(row)
        try {
            const res = await axios.delete(`/siteSubscribers/${row.id}`);
            if(res.data.success){
                dispatch({type:DELETE_SUBSCRIBER,payload:res.data.userId})
            }
        } catch (error) {
            
        }            
        // setData(removeItem(response.data.data, row));
        // setTotalRows(totalRows - 1);
        },
        [currentPage, perPage]
    );

    const columns = useMemo(
        () => [
            {
                name: "S/No",
                selector: "id",
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
        []
    );

    const handlePageChange = page => {
        const availableMembers = parseInt(perPage * page)
        if(availableMembers > siteSubscribers.length || availableMembers === siteSubscribers.length){
            fetchMoreMembers()
        }
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        const availableMembers = parseInt(newPerPage * page)
        if(availableMembers > siteSubscribers.length || availableMembers === siteSubscribers.length){
            fetchMoreMembers()
        }   
        setPerPage(newPerPage);
    };
    

    return (
        <DataTable
        title="GDI Newsletter Subscribers"
        columns={columns}
        data={siteSubscribers}
        progressPending={loading}
        pagination
        paginationTotalRows={totalSubscribers}
        paginationDefaultPage={currentPage}
        paginationRowsPerPageOptions={[10,15,20,25,30,40,50,100,200]}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        selectableRows
        onSelectedRowsChange={({ selectedRows }) => console.log(selectedRows)}
        />
    );
};
export default SiteSubscribersTable

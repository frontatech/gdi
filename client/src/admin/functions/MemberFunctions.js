
export const UpdateMemberInformation = (state,data) =>{
    console.log(data)
    const member_id = parseInt(data.member_id)
    let members = state.members
    members = members.map(member => member.member_id === member_id ? {...member,...data, member_id} : member)
    console.log(members)
    return {...state,members}
}
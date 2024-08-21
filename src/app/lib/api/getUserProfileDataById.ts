/**
    @param user_id - 유저 아이디
    @returns - profiles 테이블에 저장된 유저의 모든 데이터
    @description - profiles 테이블에서 user_id에 해당하는 유저의 모든 데이터를 가져옵니다.
*/
const getUserProfileDataById = async (user_id: string) => {
    const response = await fetch(`/api/user/${user_id}`);
    if (!response.ok) {
        throw new Error("Failed to fetch user data");
    }
    const data = await response.json();
    return data;
};

export default getUserProfileDataById;

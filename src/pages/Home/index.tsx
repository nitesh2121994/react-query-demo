import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Home = () => {
    // const client = useQueryClient();
    // console.log( client.getQueriesData(['mylist']));

    return (
        <div>
            Home

            <Link to='/products'>Products</Link>
        </div>
    )
}
export default Home;
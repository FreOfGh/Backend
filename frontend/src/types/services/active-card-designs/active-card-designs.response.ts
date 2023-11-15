import CardDesign from "../../models/card-design.ts";

type ActiveCardDesignsResponse = {
    success: boolean,
    data: Array<CardDesign>;
}

export default ActiveCardDesignsResponse;
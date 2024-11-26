import { Skeleton, Card } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";

export const ProductCardSkeleton = () => {
    return (
        <Card
            hoverable
            className="relative rounded-xl overflow-hidden shadow-lg border border-gray-100"
        >
            <Skeleton.Image active className="w-full h-[250px]" />
            <div className="flex justify-between items-center mb-3">
                <Skeleton.Input active className="w-1/2" />
                <Skeleton.Button active shape="circle" size="small" className="text-gray-400" />
            </div>
            <div className="flex items-center justify-between mb-2">
                <Skeleton.Input active className="w-1/4" />
                <Skeleton.Input active className="w-1/4" />
            </div>
            <div className="flex justify-center mt-2">
                <Skeleton.Button active className="w-full h-10" />
            </div>
        </Card>
    );
};

export default ProductCardSkeleton;

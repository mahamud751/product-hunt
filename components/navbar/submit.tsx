"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import MembershipModal from "../ui/modals/upgrade-membership-modal";
import UpgradeMembership from "../upgrade-membership";
import { isUserPremium } from "@/lib/server-actions";

interface SubmitProps {
  products: any;
  authenticatedUser: any;
}

const Submit: React.FC<SubmitProps> = ({ products, authenticatedUser }) => {
  const router = useRouter();

  const [isUpgradeModalVisible, setIsUpgradeModalVisible] = useState(false);

  const handleClick = async () => {
    const isPremium = await isUserPremium();
    // if (!isPremium && products?.length === 2) {
    //   setIsUpgradeModalVisible(true);
    // } else {
    //   router.push("/new-product");
    // }
    router.push("/new-product");
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="px-4 py-2 text-sm font-bold text-white bg-[#AF583B] rounded-lg hover:bg-[#8E472F] transition-colors"
      >
        New Launch
      </button>

      <MembershipModal
        visible={isUpgradeModalVisible}
        setVisible={setIsUpgradeModalVisible}
      >
        <UpgradeMembership authenticatedUser={authenticatedUser} />
      </MembershipModal>
    </div>
  );
};

export default Submit;

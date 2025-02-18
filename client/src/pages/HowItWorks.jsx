import React from "react";
import { CheckCircle, Users, Star, ClipboardList } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      icon: <ClipboardList className="w-12 h-12 text-blue-500" />,
      title: "Create Your Profile",
      description: "Sign up and complete your profile to start your journey.",
    },
    {
      id: 2,
      icon: <Users className="w-12 h-12 text-green-500" />,
      title: "Browse Members",
      description:
        "Explore profiles and find potential matches based on your preferences.",
    },
    {
      id: 3,
      icon: <Star className="w-12 h-12 text-yellow-500" />,
      title: "Upgrade to Premium",
      description:
        "Unlock exclusive features like contact details and premium matchmaking.",
    },
    {
      id: 4,
      icon: <CheckCircle className="w-12 h-12 text-purple-500" />,
      title: "Connect & Chat",
      description:
        "Contact members directly, chat, and take the next step in your relationship.",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-6 md:px-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        How It Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex flex-col items-center text-center bg-white p-6 shadow-lg rounded-lg"
          >
            <div className="mb-4">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;

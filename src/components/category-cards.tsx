import { GraduationCap, Award, CreditCard, FolderOpen } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const categories = [
  {
    name: "Academic Documents", 
    count: 12,
    icon: GraduationCap,
    color: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Certificates",
    count: 8, 
    icon: Award,
    color: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    name: "Government IDs",
    count: 3,
    icon: CreditCard,
    color: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800", 
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Others",
    count: 1,
    icon: FolderOpen,
    color: "bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800",
    iconColor: "text-gray-600 dark:text-gray-400",
  },
];

export function CategoryCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <Card 
            key={category.name}
            className={`cursor-pointer hover:shadow-md transition-all ${category.color}`}
          >
            <CardContent className="flex flex-col items-center justify-center p-6">
              <div className={`rounded-full p-3 bg-white dark:bg-gray-800 mb-4 shadow-sm`}>
                <Icon className={`h-6 w-6 ${category.iconColor}`} />
              </div>
              <h3 className="font-semibold text-center mb-1">{category.name}</h3>
              <p className="text-2xl font-bold text-center">{category.count}</p>
              <p className="text-xs text-muted-foreground text-center">
                {category.count === 1 ? 'document' : 'documents'}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
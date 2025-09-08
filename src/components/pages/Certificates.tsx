import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  Award, 
  Search, 
  Download, 
  Eye, 
  Calendar,
  Building,
  Star,
  Filter
} from "lucide-react";
import { useState } from "react";

const certificates = [
  {
    id: 1,
    title: "Dean's List Recognition",
    issuer: "University of Technology",
    issueDate: "2024-01-15",
    type: "Academic Achievement",
    description: "Awarded for maintaining GPA above 3.5 for Fall 2023 semester",
    verified: true,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    title: "Computer Science Excellence Award",
    issuer: "CS Department",
    issueDate: "2023-12-10",
    type: "Department Award",
    description: "Recognition for outstanding performance in core CS subjects",
    verified: true,
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop"
  },
  {
    id: 3,
    title: "Scholarship Certificate",
    issuer: "Education Foundation",
    issueDate: "2023-09-01",
    type: "Scholarship",
    description: "Merit-based scholarship for academic year 2023-2024",
    verified: true,
    image: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?w=400&h=300&fit=crop"
  },
  {
    id: 4,
    title: "Programming Competition Winner",
    issuer: "Tech Society",
    issueDate: "2023-11-20",
    type: "Competition",
    description: "First place in annual programming competition",
    verified: true,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=300&fit=crop"
  },
  {
    id: 5,
    title: "Community Service Award",
    issuer: "Student Affairs",
    issueDate: "2023-08-15",
    type: "Service",
    description: "Recognition for 100+ hours of community service",
    verified: false,
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop"
  },
  {
    id: 6,
    title: "Research Paper Publication",
    issuer: "Academic Journal",
    issueDate: "2023-07-30",
    type: "Research",
    description: "Co-authored research paper in AI and Machine Learning",
    verified: true,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
  }
];

const certificateTypes = ["All", "Academic Achievement", "Department Award", "Scholarship", "Competition", "Service", "Research"];

export function Certificates() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);

  const filteredCertificates = certificates.filter(cert => {
    const matchesSearch = cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.issuer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "All" || cert.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">Certificates & Awards</h1>
        <p className="text-muted-foreground">
          View and manage your academic achievements and certifications
        </p>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search certificates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {certificateTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCertificates.map((certificate) => (
          <Card key={certificate.id} className="cursor-pointer hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
              <img
                src={certificate.image}
                alt={certificate.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold line-clamp-2">{certificate.title}</h3>
                  {certificate.verified && (
                    <Star className="w-4 h-4 text-yellow-500 fill-current flex-shrink-0 mt-1" />
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building className="w-4 h-4" />
                    <span>{certificate.issuer}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(certificate.issueDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {certificate.description}
                </p>

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {certificate.type}
                  </Badge>
                  <div className="flex gap-1">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="w-8 h-8"
                      onClick={() => setSelectedCertificate(certificate)}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCertificates.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium mb-2">No certificates found</h3>
            <p className="text-sm text-muted-foreground">
              {searchTerm || selectedType !== "All" 
                ? "Try adjusting your search or filter criteria"
                : "Your certificates and awards will appear here"
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Certificate Detail Modal (simplified) */}
      {selectedCertificate && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Certificate Details</CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedCertificate(null)}
              >
                ×
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                <img
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">{selectedCertificate.title}</h3>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary">{selectedCertificate.type}</Badge>
                  {selectedCertificate.verified && (
                    <div className="flex items-center gap-1 text-yellow-600">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">Verified</span>
                    </div>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium">Issued by</p>
                    <p className="text-sm text-muted-foreground">{selectedCertificate.issuer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Issue Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedCertificate.issueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium">Description</p>
                  <p className="text-sm text-muted-foreground">{selectedCertificate.description}</p>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline">Share</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Feather,
  Upload,
  Save,
  Sparkles,
  Clock,
  Palette,
  Heart,
  Camera,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface StoryFormData {
  itemName: string;
  materials: string;
  craftingHistory: string;
  emotionalExpression: string;
  timeToMake: number;
}

export default function StorytellerStudio() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const form = useForm<StoryFormData>({
    defaultValues: {
      itemName: "",
      materials: "",
      craftingHistory: "",
      emotionalExpression: "",
      timeToMake: 0,
    },
  });

  const onSubmit = (data: StoryFormData) => {
    console.log("Form submitted:", data);
    // Here you would typically send the data to your backend
    alert("Story saved successfully! 🎨");
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            newImages.push(e.target.result as string);
            if (newImages.length === files.length) {
              setUploadedImages((prev) => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
            <Feather className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Storyteller Studio
            </h1>
            <p className="text-muted-foreground">
              Share the heart and soul behind your crafted creations
            </p>
          </div>
        </div>

        {/* Inspiration Quote */}
        <Card className="bg-gradient-to-r from-earth-500/10 to-accent/10 border-earth-500/20">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Sparkles className="h-6 w-6 text-earth-500 mt-1" />
              <div>
                <p className="text-lg italic text-foreground/90 mb-2">
                  "Every craft has a story, every story has power to inspire."
                </p>
                <p className="text-sm text-muted-foreground">
                  Tell your story and let your passion shine through every
                  detail.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Form */}
      <Card className="bg-card/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Heart className="h-5 w-5 text-earth-500" />
            Craft Your Story
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Item Name */}
              <FormField
                control={form.control}
                name="itemName"
                rules={{ required: "Item name is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium">
                      Item Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What did you create? (e.g., Hand-woven Wool Scarf)"
                        className="h-12"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Give your creation a name that captures its essence
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Materials Used */}
              <FormField
                control={form.control}
                name="materials"
                rules={{ required: "Materials information is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <Palette className="h-4 w-4 text-accent" />
                      Materials Used
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe the materials you used... (e.g., Organic merino wool from local farms, natural dyes made from turmeric and indigo, wooden needles carved from oak)"
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share the materials that brought your vision to life -
                      their origins, qualities, and why you chose them
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Crafting History/Learning */}
              <FormField
                control={form.control}
                name="craftingHistory"
                rules={{ required: "Crafting history is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <Feather className="h-4 w-4 text-primary" />
                      Crafting History & Learning
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about your journey with this craft... (e.g., I learned weaving from my grandmother when I was 12. This scarf represents 15 years of perfecting tension control and color blending techniques)"
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Share how you learned this craft, your journey, and what
                      skills this piece showcases
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Emotional Expression */}
              <FormField
                control={form.control}
                name="emotionalExpression"
                rules={{ required: "Emotional expression is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <Heart className="h-4 w-4 text-earth-500" />
                      Emotional Expression & Idea
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What emotions or ideas does this piece express? (e.g., This scarf embodies the warmth and comfort I felt wrapped in my grandmother's love. The earth tones represent my connection to nature and sustainable living)"
                        className="min-h-[120px] resize-y"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe the feelings, memories, or concepts that inspired
                      this creation
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Time to Make */}
              <FormField
                control={form.control}
                name="timeToMake"
                rules={{
                  required: "Time to make is required",
                  min: { value: 1, message: "Time must be at least 1 hour" },
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Time to Make (hours)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g., 24"
                        className="h-12 max-w-xs"
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      />
                    </FormControl>
                    <FormDescription>
                      How many hours did you spend creating this piece?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Photo Upload Section */}
              <div className="space-y-4">
                <Label className="text-base font-medium flex items-center gap-2">
                  <Camera className="h-4 w-4 text-accent" />
                  Upload Photos
                </Label>
                <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
                  <CardContent className="p-8">
                    <div className="text-center space-y-4">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto" />
                      <div>
                        <p className="text-base font-medium text-foreground mb-1">
                          Upload your craft photos
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Show different angles, details, and the process
                        </p>
                      </div>
                      <Button asChild variant="outline" className="mt-4">
                        <label className="cursor-pointer">
                          Choose Photos
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </label>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Preview Uploaded Images */}
                {uploadedImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    {uploadedImages.map((image, index) => (
                      <div
                        key={index}
                        className="relative aspect-square rounded-lg overflow-hidden bg-muted"
                      >
                        <img
                          src={image}
                          alt={`Upload ${index + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 bg-primary hover:bg-primary/90"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Your Story
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

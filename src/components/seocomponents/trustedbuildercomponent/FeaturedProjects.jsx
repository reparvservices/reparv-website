"use client";

import Link from "next/link";
import {
  getProjectBuilderName,
  getPropertyImage,
} from "../../../utils/trustedBuilders";

export default function FeaturedProjects({
  projects = [],
  loading = false,
}) {
  if (!loading && projects.length === 0) {
    return null;
  }

  return (
    <section id="featured-projects" className="bg-white py-12 sm:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#3F2D62]">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-base text-gray-500 mt-2 max-w-xl mx-auto">
            Discover premium residential and commercial projects from verified
            builders across India
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow h-[320px] animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div
                key={project.propertyid}
                className="bg-white rounded-2xl shadow-[0_12px_40px_#00000014] overflow-hidden flex flex-col"
              >
                <div className="relative h-[200px]">
                  <img
                    src={getPropertyImage(project)}
                    alt={project.propertyName}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col flex-1">
                  <h4 className="font-semibold text-sm mb-1">
                    {project.propertyName}
                  </h4>

                  <p className="text-xs text-gray-500 mb-2">
                    by {getProjectBuilderName(project)}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <img
                      src="/assets/seopageassets/turstedbuilder/location.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                    {[project.location, project.city, project.state]
                      .filter(Boolean)
                      .join(", ")}
                  </div>

                  <Link
                    href={`/property-info/${project.seoSlug}`}
                    className="mt-auto w-full h-[40px] bg-[#7C3AED] text-white rounded-lg text-sm font-semibold hover:opacity-90 transition flex items-center justify-center"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center mt-10">
          <Link
            href="/properties"
            className="px-8 h-[44px] border border-[#7C3AED] text-[#7C3AED] rounded-lg font-semibold hover:bg-[#7C3AED] hover:text-white transition flex items-center justify-center"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

const icons = import.meta.glob(`/node_modules/@meteocons/svg/fill/*.svg`, {
    eager: true,
    import: "default",
});

export function getIcon(slug: string) {
    return icons[`/node_modules/@meteocons/svg/fill/${slug}.svg`] as string;
}

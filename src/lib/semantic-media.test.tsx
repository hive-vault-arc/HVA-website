import {readFileSync, existsSync, readdirSync} from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import {render, screen} from '@testing-library/react';
import ResponsiveMedia from '@/components/media/ResponsiveMedia';
import CloudEcosystemRail from '@/components/media/CloudEcosystemRail';
import {SEMANTIC_MEDIA, type SemanticMediaDefinition} from './semantic-media';

const projectRoot = process.cwd();

function publicAsset(assetPath: string) {
  return path.join(projectRoot, 'public', assetPath.replace(/^\//, ''));
}

function collectMedia(value: unknown): SemanticMediaDefinition[] {
  if (!value || typeof value !== 'object') return [];
  if ('desktopSrc' in value && 'altKey' in value) {
    return [value as SemanticMediaDefinition];
  }
  return Object.values(value).flatMap(collectMedia);
}

describe('semantic media registry', () => {
  it('keeps locked covers and the Home route block unchanged', () => {
    const homeGuide = readFileSync(
      path.join(projectRoot, 'src/components/HomeDecisionGuide.tsx'),
      'utf8',
    );
    const capabilities = readFileSync(
      path.join(projectRoot, 'src/views/Capabilities.tsx'),
      'utf8',
    );
    const industries = readFileSync(
      path.join(projectRoot, 'src/views/Industries.tsx'),
      'utf8',
    );

    expect(homeGuide).toContain('/Images/page-heroes/hva-capabilities-hero-background.webp');
    expect(homeGuide).toContain('/Images/page-heroes/hva-industries-hero-background.webp');
    expect(homeGuide).toContain('/Images/insights/hva-case-studies-ai-transformation-morocco.webp');
    expect(capabilities).toContain('/Images/page-heroes/hva-capabilities-magnetic-fields-hero-v2.webp');
    expect(industries).toContain('/Images/page-heroes/hva-industries-adaptive-fields-hero-v2.webp');
  });

  it('keeps Real Estate on approved sector photography and its protected crop', () => {
    expect(SEMANTIC_MEDIA.industries.realEstate).toMatchObject({
      desktopSrc: '/Images/industries/real-estate-crm-lead-operations-morocco.webp',
      objectPosition: {desktop: '50% 52%', mobile: '50% 52%'},
      locked: true,
    });
  });

  it('uses the approved r5 Software Engineering and Cloud Infrastructure assets', () => {
    expect(SEMANTIC_MEDIA.capabilities.softwareEngineering.desktopSrc).toBe(
      '/Images/semantic/capabilities/software-engineering-r5.webp',
    );
    expect(SEMANTIC_MEDIA.capabilities.cloudInfrastructure.desktopSrc).toBe(
      '/Images/semantic/capabilities/cloud-infrastructure-r5.webp',
    );
  });

  it('uses the responsive r5 Home software and cloud assets while preserving the approved ARC worktable', () => {
    expect(SEMANTIC_MEDIA.home.aiSoftware.desktopSrc).toBe(
      '/Images/semantic/home/ai-software-r5-desktop.webp',
    );
    expect(SEMANTIC_MEDIA.home.aiSoftware.mobileSrc).toBe(
      '/Images/semantic/home/ai-software-r5-mobile.webp',
    );
    expect(SEMANTIC_MEDIA.home.cloudOperations.desktopSrc).toBe(
      '/Images/semantic/home/cloud-operations-r5-desktop.webp',
    );
    expect(SEMANTIC_MEDIA.home.cloudOperations.mobileSrc).toBe(
      '/Images/semantic/home/cloud-operations-r5-mobile.webp',
    );
    expect(SEMANTIC_MEDIA.home.arcOperatingModel).toMatchObject({
      desktopSrc: '/Images/home/arc-operating-model-session.webp',
      locked: true,
    });
  });

  it('exports the approved r5 family at the largest non-upscaled responsive frames', async () => {
    for (const name of ['assess', 'reengineer', 'command']) {
      const desktop = await sharp(
        path.join(projectRoot, 'public/Images/semantic/arc', `${name}-r5-desktop.webp`),
      ).metadata();
      const mobile = await sharp(
        path.join(projectRoot, 'public/Images/semantic/arc', `${name}-r5-mobile.webp`),
      ).metadata();
      expect([desktop.width, desktop.height]).toEqual([1774, 887]);
      expect([mobile.width, mobile.height]).toEqual([1416, 885]);
    }

    for (const name of [
      'strategy-business',
      'technology-consulting',
      'ai-data',
      'software-engineering',
      'cloud-infrastructure',
      'operations-managed',
    ]) {
      const metadata = await sharp(
        path.join(projectRoot, 'public/Images/semantic/capabilities', `${name}-r5.webp`),
      ).metadata();
      expect([metadata.width, metadata.height]).toEqual([1664, 936]);
    }

    for (const name of ['strategy-technology', 'ai-software', 'cloud-operations']) {
      const desktop = await sharp(
        path.join(projectRoot, 'public/Images/semantic/home', `${name}-r5-desktop.webp`),
      ).metadata();
      const mobile = await sharp(
        path.join(projectRoot, 'public/Images/semantic/home', `${name}-r5-mobile.webp`),
      ).metadata();
      expect([desktop.width, desktop.height]).toEqual([1774, 887]);
      expect([mobile.width, mobile.height]).toEqual([1568, 882]);
    }
  });

  it('registers existing English and French media with safe focal positions', () => {
    for (const media of collectMedia(SEMANTIC_MEDIA)) {
      expect(media.alt.en.length).toBeGreaterThan(20);
      expect(media.alt.fr.length).toBeGreaterThan(20);
      expect(existsSync(publicAsset(media.desktopSrc))).toBe(true);
      if (media.mobileSrc) expect(existsSync(publicAsset(media.mobileSrc))).toBe(true);

      for (const position of Object.values(media.objectPosition)) {
        const percentages = position.match(/\d+(?:\.\d+)?/g)?.map(Number) ?? [];
        percentages.forEach((value) => {
          expect(value).toBeGreaterThanOrEqual(20);
          expect(value).toBeLessThanOrEqual(80);
        });
      }
    }
  });

  it('exports sharp WebP assets at useful production dimensions', async () => {
    const semanticRoot = path.join(projectRoot, 'public/Images/semantic');
    const files = readdirSync(semanticRoot, {recursive: true})
      .map(String)
      .filter((file) => file.endsWith('.webp'));

    expect(files.length).toBeGreaterThanOrEqual(39);
    for (const file of files) {
      const metadata = await sharp(path.join(semanticRoot, file)).metadata();
      expect(metadata.format).toBe('webp');
      expect(metadata.width ?? 0).toBeGreaterThanOrEqual(640);
      expect(metadata.height ?? 0).toBeGreaterThanOrEqual(700);
    }
  });

  it('exports approved r3 assets at their largest non-upscaled responsive frames', async () => {
    const expectedDimensions = new Map<string, [number, number]>();

    for (const name of ['assess', 'reengineer', 'command']) {
      expectedDimensions.set(`arc/${name}-r3-desktop.webp`, [1774, 887]);
      expectedDimensions.set(`arc/${name}-r3-mobile.webp`, [1416, 885]);
    }

    for (const name of [
      'strategy-business',
      'technology-consulting',
      'ai-data',
      'software-engineering',
      'cloud-infrastructure',
      'operations-managed',
    ]) {
      expectedDimensions.set(`capabilities/${name}-r3.webp`, [1664, 936]);
    }

    for (const name of [
      'strategy-technology',
      'ai-software',
      'cloud-operations',
      'arc-operating-model',
    ]) {
      expectedDimensions.set(`home/${name}-r3-desktop.webp`, [1774, 887]);
      expectedDimensions.set(`home/${name}-r3-mobile.webp`, [1568, 882]);
    }

    const industryDimensions = {
      healthcare: {desktop: [1872, 819], mobile: [656, 820]},
      finance: {desktop: [1888, 826], mobile: [660, 825]},
      government: {desktop: [1888, 826], mobile: [660, 825]},
      retail: {desktop: [1824, 798], mobile: [684, 855]},
      energy: {desktop: [1888, 826], mobile: [664, 830]},
      logistics: {desktop: [1872, 819], mobile: [656, 820]},
      'consumer-luxury': {desktop: [1888, 826], mobile: [660, 825]},
    } as const;

    for (const [name, dimensions] of Object.entries(industryDimensions)) {
      expectedDimensions.set(
        `industries/${name}-r3-desktop.webp`,
        [dimensions.desktop[0], dimensions.desktop[1]],
      );
      expectedDimensions.set(
        `industries/${name}-r3-mobile.webp`,
        [dimensions.mobile[0], dimensions.mobile[1]],
      );
    }

    expectedDimensions.set('industries/method-r3-desktop.webp', [1774, 887]);
    expectedDimensions.set('industries/method-r3-mobile.webp', [1416, 885]);

    for (const [file, [width, height]] of expectedDimensions) {
      const metadata = await sharp(
        path.join(projectRoot, 'public/Images/semantic', file),
      ).metadata();
      expect([metadata.width, metadata.height]).toEqual([width, height]);
    }
  });

  it('exports the Home r4 card assets at their native 16:9 delivery frame', async () => {
    for (const file of [
      'home/ai-software-r4.webp',
      'home/cloud-operations-r4.webp',
    ]) {
      const metadata = await sharp(
        path.join(projectRoot, 'public/Images/semantic', file),
      ).metadata();
      expect([metadata.width, metadata.height]).toEqual([1671, 940]);
    }
  });

  it('keeps every r3 delivery file within its approved master dimensions', async () => {
    const masterExtension = ['p', 'n', 'g'].join('');
    const pairs = [
      ...['assess', 'reengineer', 'command'].map((name) => ({
        master: `arc/${name}.${masterExtension}`,
        outputs: [`arc/${name}-r3-desktop.webp`, `arc/${name}-r3-mobile.webp`],
      })),
      ...[
        'strategy-business',
        'technology-consulting',
        'ai-data',
        'software-engineering',
        'cloud-infrastructure',
        'operations-managed',
      ].map((name) => ({
        master: `capabilities/${name}.${masterExtension}`,
        outputs: [`capabilities/${name}-r3.webp`],
      })),
      ...[
        'strategy-technology',
        'ai-software',
        'cloud-operations',
        'arc-operating-model',
      ].map((name) => ({
        master: `home/${name}.${masterExtension}`,
        outputs: [
          `home/${name}-r3-desktop.webp`,
          `home/${name}-r3-mobile.webp`,
        ],
      })),
      ...[
        'healthcare',
        'finance',
        'government',
        'retail',
        'energy',
        'logistics',
        'consumer-luxury',
        'method',
      ].map((name) => ({
        master: `industries/${name}.${masterExtension}`,
        outputs: [
          `industries/${name}-r3-desktop.webp`,
          `industries/${name}-r3-mobile.webp`,
        ],
      })),
    ];

    for (const pair of pairs) {
      const master = await sharp(
        path.join(projectRoot, 'assets/image-masters/semantic/r3', pair.master),
      ).metadata();

      for (const output of pair.outputs) {
        const delivery = await sharp(
          path.join(projectRoot, 'public/Images/semantic', output),
        ).metadata();
        expect(delivery.width ?? Infinity).toBeLessThanOrEqual(master.width ?? 0);
        expect(delivery.height ?? Infinity).toBeLessThanOrEqual(master.height ?? 0);
      }
    }
  });
});

describe('responsive semantic media', () => {
  it('uses one responsive picture instead of rendering two images', () => {
    const {container} = render(
      <div style={{position: 'relative', width: 800, height: 400}}>
        <ResponsiveMedia
          media={SEMANTIC_MEDIA.arc.assess}
          locale="en"
          sizes="100vw"
        />
      </div>,
    );

    expect(container.querySelectorAll('picture')).toHaveLength(1);
    expect(container.querySelectorAll('source')).toHaveLength(1);
    expect(container.querySelectorAll('img')).toHaveLength(1);
    expect(container.querySelector('source')).toHaveAttribute(
      'srcset',
      SEMANTIC_MEDIA.arc.assess.mobileSrc,
    );
  });

  it('names every real cloud ecosystem logo accessibly', () => {
    render(<CloudEcosystemRail ariaLabel="Cloud technology ecosystem" />);

    for (const name of [
      'AWS',
      'Microsoft Azure',
      'Google Cloud',
      'DigitalOcean',
      'Docker',
      'Kubernetes',
    ]) {
      expect(screen.getByRole('img', {name})).toBeInTheDocument();
    }
  });
});

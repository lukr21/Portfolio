import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function ClassifierPage() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to Projects
        </Link>
        <p className="project-hero__tag">UPenn ENGR 1050 &middot; December 2024</p>
        <h1 className="project-hero__title">Cat/Dog Image Classifier</h1>
        <p className="project-hero__subtitle">
          A PyTorch CNN trained on 24,000 images, a self-directed deep dive into
          convolutional neural networks that went well beyond course content.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Course</p>
            <p className="meta-item__value">ENGR 1050 (Final Project)</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Type</p>
            <p className="meta-item__value">Individual project</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Accuracy</p>
            <p className="meta-item__value">97.8% validation</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        <ScrollReveal tag="h2" id="why-this-project">Why This Project?</ScrollReveal>
        <ScrollReveal tag="p">
          This was the final project for an introductory engineering course where
          students could build anything related to class material. The most AI
          they&apos;d covered was a single-layer perceptron. I wanted to go
          beyond, so I self-taught convolutional neural networks and built this
          classifier from scratch. I consulted resources to understand how CNNs
          work, particularly how they consider the spatial relationships between
          pixels, not just their individual values, making them far better suited
          for image processing than a simple perceptron.
        </ScrollReveal>

        <ScrollReveal tag="h2" id="architecture">Architecture</ScrollReveal>
        <ScrollReveal tag="p">
          The CNN has 4 convolutional layers with increasing filter counts (64
          &rarr; 128 &rarr; 256 &rarr; 512), each followed by BatchNorm, ReLU
          activation, and MaxPool. After flattening, three fully connected layers
          (1024 &rarr; 256 &rarr; 1) produce a binary classification with
          BCEWithLogitsLoss. Dropout (0.5) after the first FC layer helps prevent
          overfitting. Training used Adam optimizer (lr=0.0001) with a StepLR
          scheduler (step=10, gamma=0.1).
        </ScrollReveal>

        <ScrollReveal>
          <div className="code-block">
            <code>
              {`Conv2d(3→64) → BN → ReLU → Pool
Conv2d(64→128) → BN → ReLU → Pool
Conv2d(128→256) → BN → ReLU → Pool
Conv2d(256→512) → BN → ReLU → Pool
Flatten → FC(32768→1024) → Dropout(0.5)
FC(1024→256) → FC(256→1) → Sigmoid`}
            </code>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="specs-grid">
            <div className="spec-card">
              <p className="spec-card__label">Input</p>
              <p className="spec-card__value">128&times;128 RGB</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Dataset</p>
              <p className="spec-card__value">24,000 images</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Split</p>
              <p className="spec-card__value">80% train, 20% val</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Epochs</p>
              <p className="spec-card__value">150</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Peak Accuracy</p>
              <p className="spec-card__value spec-card__value--blue">97.8%</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="h2" id="training-results">Training Results</ScrollReveal>
        <ScrollReveal tag="p">
          I initially planned around 50 epochs but decided to push it to 150 to
          see what would happen. The model converged rapidly. By epoch 15,
          validation accuracy was already above 97%. The remaining 135 epochs
          showed essentially no improvement, with train loss near zero and
          validation loss plateaued around 0.12, showing mild overfitting but
          excellent generalization.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block">
            <img
              src="/assets/img/classifier_training_curves.png"
              alt="Training and validation curves over 150 epochs"
            />
            <div className="media-block__caption">
              Training and validation curves over 150 epochs, convergence by
              epoch ~15, then diminishing returns
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="h2" id="real-world-testing">Real-World Testing</ScrollReveal>
        <ScrollReveal tag="p">
          I tested the model on personal pet photos and internet images. When
          confident, it was very confident (100% on clear dog/cat photos). On
          ambiguous or out-of-distribution images like cartoon cats or meme
          images, the confidence dropped appropriately, showing the model had
          learned meaningful features rather than just memorizing the training
          set.
        </ScrollReveal>

        <div className="media-row">
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/classifier_2.18.31_PM.jpg"
                alt="Example 1: dog classification"
              />
              <div className="media-block__caption">100% confident, dog</div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/classifier_2.18.43_PM.jpg"
                alt="Example 2: cartoon cat classification"
              />
              <div className="media-block__caption">
                89.87%, cartoon cat (lower confidence)
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/classifier_2.18.53_PM.jpg"
                alt="Example 3: dog in blanket classification"
              />
              <div className="media-block__caption">
                100% confident, dog in blanket
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/classifier_2.19.06_PM.jpg"
                alt="Example 4: real cats classification"
              />
              <div className="media-block__caption">99.85%, real cats</div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="callout">
            <p>
              This first exposure to machine learning helped me realize how much
              of a black box AI is, but conversely, how engineerable it is. The
              project showed that with the right architecture, data pipeline, and
              training setup, you can build something that genuinely works
              without fully understanding every mathematical detail of why it
              works. That tension between black-box behavior and practical
              engineering is what made ML click for me.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
